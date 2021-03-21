import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfileService: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfileService = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to update profile and password', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    user.confirmation_status = true;
    user.bio = 'updated-bio';

    const response = await updateUserProfileService.execute({
      userId: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      bio: user.bio,
      password: 'new-password',
      oldPassword: user.password,
    });

    expect(response).toEqual(user);
  });

  it('Should be able to update only profile', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    user.confirmation_status = true;
    user.bio = 'updated-bio';

    const response = await updateUserProfileService.execute({
      userId: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      bio: user.bio,
    });

    expect(response).toEqual(user);
  });

  it('Should not be able to update profile of a non existing user', async () => {
    await expect(
      updateUserProfileService.execute({
        userId: 'non-existing-user',
        name: 'John Doe',
        nickname: 'johndoe',
        email: 'johndoe@example.com',
        bio: 'example',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update profile of a non verified account', async () => {
    const { id: userId, ...rest } = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    await expect(
      updateUserProfileService.execute({
        userId,
        ...rest,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update profile with an already in use e-mail', async () => {
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
    user.email = 'johndoe@example.com';

    await expect(
      updateUserProfileService.execute({
        ...user,
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update profile with an already in use nickname', async () => {
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
    user.nickname = 'johndoe';

    await expect(
      updateUserProfileService.execute({
        ...user,
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update profile password without provides oldPassword', async () => {
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
      updateUserProfileService.execute({
        ...user,
        userId: user.id,
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update profile password with an incorrect oldPassword', async () => {
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
      updateUserProfileService.execute({
        ...user,
        userId: user.id,
        password: user.password,
        oldPassword: 'oldPasswordWitchDoesNotMatch',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
