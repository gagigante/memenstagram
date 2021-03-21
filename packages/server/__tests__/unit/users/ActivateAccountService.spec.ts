import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ActivateAccountService from '@modules/users/services/ActivateAccountService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let activateAccountService: ActivateAccountService;

describe('ActivateAccount', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    activateAccountService = new ActivateAccountService(fakeUsersRepository);
  });

  it('Should be able to active account', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    const verifiedUser = await activateAccountService.execute({
      user_id: user.id,
      confirmation_code: '123456',
    });

    expect(verifiedUser.confirmation_status).toBeTruthy();
  });

  it('Should not be able to activate a non existing account', async () => {
    await expect(
      activateAccountService.execute({
        user_id: 'non-existing-user-id',
        confirmation_code: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to activate an already verified account', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    user.confirmation_status = true;

    await expect(
      activateAccountService.execute({
        user_id: user.id,
        confirmation_code: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to activate an account with an invalid confirmation code', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    await expect(
      activateAccountService.execute({
        user_id: user.id,
        confirmation_code: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
