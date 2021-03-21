import ShowUserFollowsAndFollowersService from '@modules/users/services/ShowUserFollowsAndFollowersService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeFollowersRepository from '@modules/users/repositories/fakes/FakeFollowersRepository';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeFollowersRepository: FakeFollowersRepository;
let showUserFollowsAndFollowersService: ShowUserFollowsAndFollowersService;

describe('ShowUserFollowsAndFollowers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeFollowersRepository = new FakeFollowersRepository();

    showUserFollowsAndFollowersService = new ShowUserFollowsAndFollowersService(
      fakeUsersRepository,
      fakeFollowersRepository,
    );
  });

  it('Should be able to show user follows and followers', async () => {
    const followsCall = jest.spyOn(fakeFollowersRepository, 'showUserFollows');
    const followersCall = jest.spyOn(
      fakeFollowersRepository,
      'showUserFollowers',
    );

    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    const user2 = fakeUsersRepository.create({
      name: 'John Tre',
      nickname: 'johntre',
      email: 'johntre@example.com',
      phone_number: '+5511987654321',
      password: '123456',
      confirmation_code: '123456',
    });

    const user3 = fakeUsersRepository.create({
      name: 'John Qua',
      nickname: 'johnqua',
      email: 'johnqua@example.com',
      phone_number: '+551167898765',
      password: '123456',
      confirmation_code: '123456',
    });

    await fakeFollowersRepository.follow({
      loggedUserId: user.id,
      followedUserId: user2.id,
    });

    await fakeFollowersRepository.follow({
      loggedUserId: user.id,
      followedUserId: user3.id,
    });

    await fakeFollowersRepository.follow({
      loggedUserId: user2.id,
      followedUserId: user.id,
    });

    const userFollowsAndFollowers = await showUserFollowsAndFollowersService.execute(
      { nickname: user.nickname, loggedUserId: user.id },
    );

    expect(userFollowsAndFollowers).toEqual({
      follows: [],
      followers: [],
    });

    expect(followsCall).toHaveBeenCalledWith(user.id);
    expect(followersCall).toHaveBeenCalledWith(user.id);
  });

  it('Should not be able to show follows and followers with an invalid user id', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    await expect(
      showUserFollowsAndFollowersService.execute({
        nickname: user.nickname,
        loggedUserId: 'invalid-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to show follows and followers with an invalid nickname', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    await expect(
      showUserFollowsAndFollowersService.execute({
        nickname: 'invalid-nickname',
        loggedUserId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
