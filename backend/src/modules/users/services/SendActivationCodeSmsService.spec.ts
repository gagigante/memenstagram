import AppError from '@shared/errors/AppError';

import FakeSMSProvider from '@shared/containers/providers/SMSProvider/fakes/FakeSMSProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendActivationCodeSmsService from './SendActivationCodeSmsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeSMSProvider: FakeSMSProvider;
let sendActivationCodeSmsService: SendActivationCodeSmsService;

describe('SendActivationCodeSms', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSMSProvider = new FakeSMSProvider();

    sendActivationCodeSmsService = new SendActivationCodeSmsService(
      fakeUsersRepository,
      fakeSMSProvider,
    );
  });

  it('Should be able to send activation code', async () => {
    const sendSMS = jest.spyOn(fakeSMSProvider, 'sendSMS');

    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    await sendActivationCodeSmsService.execute({
      userId: user.id,
    });

    expect(sendSMS).toHaveBeenCalled();
  });

  it('Should not be able to send activation code to a non existing user', async () => {
    await expect(
      sendActivationCodeSmsService.execute({
        userId: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
