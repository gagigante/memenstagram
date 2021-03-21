import { classToClass } from 'class-transformer';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfileService: ShowUserProfileService;

describe('ShowUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUserProfileService = new ShowUserProfileService(fakeUsersRepository);
  });

  it('Should be able to show user profile', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    user.confirmation_status = true;

    const user2 = fakeUsersRepository.create({
      name: 'John Tre',
      nickname: 'johntre',
      email: 'johntre@example.com',
      phone_number: '+5511987654321',
      password: '123456',
      confirmation_code: '123456',
    });

    user2.confirmation_status = true;
    Object.assign(user2, { avatar_url: null });

    const serializedUser2 = classToClass(user2);

    const response = await showUserProfileService.execute({
      loggedUserId: user.id,
      nickname: user2.nickname,
    });

    expect(response).toEqual(serializedUser2);
  });

  it('Should not be able to show any user profile with a non existing user', async () => {
    await expect(
      showUserProfileService.execute({
        loggedUserId: 'non-existing-user',
        nickname: 'johndoe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to show any user profile with a non verified account', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    await expect(
      showUserProfileService.execute({
        loggedUserId: user.id,
        nickname: 'johndoe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to show user profile of a non existing user', async () => {
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
      showUserProfileService.execute({
        loggedUserId: user.id,
        nickname: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to show user profile of a non verified account', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    user.confirmation_status = true;

    fakeUsersRepository.create({
      name: 'John Tre',
      nickname: 'johntre',
      email: 'johntre@example.com',
      phone_number: '+5511987654321',
      password: '123456',
      confirmation_code: '123456',
    });

    await expect(
      showUserProfileService.execute({
        loggedUserId: user.id,
        nickname: 'johntre',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
