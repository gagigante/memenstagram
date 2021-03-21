import FollowUserService from '@modules/users/services/FollowUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeFollowersRepository from '@modules/users/repositories/fakes/FakeFollowersRepository';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeFollowersRepository: FakeFollowersRepository;
let followUserService: FollowUserService;

describe('FollowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeFollowersRepository = new FakeFollowersRepository();

    followUserService = new FollowUserService(
      fakeUsersRepository,
      fakeFollowersRepository,
    );
  });

  it('Should be able to follow a user', async () => {
    const createFollow = jest.spyOn(fakeFollowersRepository, 'follow');

    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    user.confirmation_status = true;

    const userToFollow = fakeUsersRepository.create({
      name: 'John Tre',
      nickname: 'johntre',
      email: 'johntre@example.com',
      phone_number: '+55987654321',
      password: '123456',
      confirmation_code: '123456',
    });

    userToFollow.confirmation_status = true;

    await followUserService.execute({
      loggedUserId: user.id,
      followedUserId: userToFollow.id,
    });

    expect(createFollow).toHaveBeenCalledWith({
      loggedUserId: user.id,
      followedUserId: userToFollow.id,
    });
  });

  it('Should not be able to follow an user with a non verified account', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    const userToFollow = fakeUsersRepository.create({
      name: 'John Tre',
      nickname: 'johntre',
      email: 'johntre@example.com',
      phone_number: '+55987654321',
      password: '123456',
      confirmation_code: '123456',
    });

    userToFollow.confirmation_status = true;

    await expect(
      followUserService.execute({
        loggedUserId: user.id,
        followedUserId: userToFollow.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to follow an user with an invalid userId', async () => {
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
      followUserService.execute({
        loggedUserId: 'invalid-user-id',
        followedUserId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to follow an user with an invalid followedUserId', async () => {
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
      followUserService.execute({
        loggedUserId: user.id,
        followedUserId: 'invalid-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to follow yourself', async () => {
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
      followUserService.execute({
        loggedUserId: user.id,
        followedUserId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to follow an already followed user', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    user.confirmation_status = true;

    const userToFollow = fakeUsersRepository.create({
      name: 'John Tre',
      nickname: 'johntre',
      email: 'johntre@example.com',
      phone_number: '+55987654321',
      password: '123456',
      confirmation_code: '123456',
    });

    userToFollow.confirmation_status = true;

    await followUserService.execute({
      loggedUserId: user.id,
      followedUserId: userToFollow.id,
    });

    await expect(
      followUserService.execute({
        loggedUserId: user.id,
        followedUserId: userToFollow.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
