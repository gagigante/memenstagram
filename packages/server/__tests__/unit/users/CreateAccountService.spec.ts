import CreateAccountService from '@modules/users/services/CreateAccountService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateAccountService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateAccountService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      nickname: 'john_doe',
      phoneNumber: '+5511123456789',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an already in use e-mail', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      nickname: 'john_doe',
      phoneNumber: '+5511123456789',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'John Tree',
        email: 'johndoe@example.com',
        nickname: 'john_tre',
        phoneNumber: '+5511987654321',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with an already in use phone number', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      nickname: 'john_doe',
      phoneNumber: '+5511123456789',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'John Tree',
        email: 'johntre@example.com',
        nickname: 'john_tre',
        phoneNumber: '+5511123456789',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with an already in use nickname', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      nickname: 'john_doe',
      phoneNumber: '+5511123456789',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'John Tree',
        email: 'johntre@example.com',
        nickname: 'john_doe',
        phoneNumber: '+5511987654321',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
