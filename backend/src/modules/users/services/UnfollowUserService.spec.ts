import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeFollowersRepository from '../repositories/fakes/FakeFollowersRepository';
import UnfollowUserService from './UnfollowUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeFollowersRepository: FakeFollowersRepository;
let unfollowUserService: UnfollowUserService;

describe('FollowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeFollowersRepository = new FakeFollowersRepository();

    unfollowUserService = new UnfollowUserService(
      fakeUsersRepository,
      fakeFollowersRepository,
    );
  });

  it('Should be able to unfollow a user', async () => {
    const unfollow = jest.spyOn(fakeFollowersRepository, 'unfollow');

    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    const userToUnfollow = fakeUsersRepository.create({
      name: 'John Tre',
      nickname: 'johntre',
      email: 'johntre@example.com',
      phone_number: '+5511987654321',
      password: '123456',
      confirmation_code: '123456',
    });

    fakeFollowersRepository.follow({
      loggedUserId: user.id,
      followedUserId: userToUnfollow.id,
    });

    await unfollowUserService.execute({
      loggedUserId: user.id,
      followedUserId: userToUnfollow.id,
    });

    expect(unfollow).toHaveBeenCalledWith({
      loggedUserId: user.id,
      followedUserId: userToUnfollow.id,
    });
  });

  it('Should not be able to unfollow an user with an invalid userId', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    await expect(
      unfollowUserService.execute({
        loggedUserId: 'invalid-user-id',
        followedUserId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to unfollow an user with an invalid followedUserId', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    await expect(
      unfollowUserService.execute({
        loggedUserId: user.id,
        followedUserId: 'invalid-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to unfollow yourself', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    await expect(
      unfollowUserService.execute({
        loggedUserId: user.id,
        followedUserId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to unfollow an non followed user', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    const userToUnfollow = fakeUsersRepository.create({
      name: 'John Tre',
      nickname: 'johntre',
      email: 'johntre@example.com',
      phone_number: '+5511987654321',
      password: '123456',
      confirmation_code: '123456',
    });

    await expect(
      unfollowUserService.execute({
        loggedUserId: user.id,
        followedUserId: userToUnfollow.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
