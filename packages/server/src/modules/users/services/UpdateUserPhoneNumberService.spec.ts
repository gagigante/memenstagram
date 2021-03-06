import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserPhoneNumberService from './UpdateUserPhoneNumberService';

let fakeUsersRepository: FakeUsersRepository;
let updateUserPhoneNumberService: UpdateUserPhoneNumberService;

describe('UpdateUserPhoneNumber', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    updateUserPhoneNumberService = new UpdateUserPhoneNumberService(
      fakeUsersRepository,
    );
  });

  it('Should be able to update phone number', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    user.confirmation_status = true;

    const response = await updateUserPhoneNumberService.execute({
      userId: user.id,
      phoneNumber: '+5511123456789',
    });

    expect(response.phone_number).toBe('+5511123456789');
    expect(response.confirmation_status).toBeFalsy();
  });

  it('Should not be able to update phone number of a non existing user', async () => {
    await expect(
      updateUserPhoneNumberService.execute({
        userId: 'non-existing-id',
        phoneNumber: '+5511123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update phone number of a non verified account', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    await expect(
      updateUserPhoneNumberService.execute({
        userId: user.id,
        phoneNumber: '+5511123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update phone number with an invalid number format', async () => {
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
      updateUserPhoneNumberService.execute({
        userId: user.id,
        phoneNumber: '9987654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update phone number with an already in use phone number', async () => {
    fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    const user = fakeUsersRepository.create({
      name: 'John Tre',
      nickname: 'johntre',
      email: 'johntre@example.com',
      phone_number: '+5511987654321',
      password: '123456',
      confirmation_code: '123456',
    });

    user.confirmation_status = true;

    await expect(
      updateUserPhoneNumberService.execute({
        userId: user.id,
        phoneNumber: '+5511123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
