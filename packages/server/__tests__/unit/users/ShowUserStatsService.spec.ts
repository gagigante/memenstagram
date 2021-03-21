import ShowUserStatsService from '@modules/users/services/ShowUserStatsService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import FakeFollowersRepository from '@modules/users/repositories/fakes/FakeFollowersRepository';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakePostsRepository: FakePostsRepository;
let fakeFollowersRepository: FakeFollowersRepository;

let showUserStatsService: ShowUserStatsService;

describe('ShowUserStats', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePostsRepository = new FakePostsRepository();
    fakeFollowersRepository = new FakeFollowersRepository();

    showUserStatsService = new ShowUserStatsService(
      fakeUsersRepository,
      fakeFollowersRepository,
      fakePostsRepository,
    );
  });

  it('Should be able to show user stats', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    user.confirmation_status = true;

    const response = await showUserStatsService.execute({
      nickname: user.nickname,
      loggedUserId: user.id,
    });

    expect(response).toEqual({
      posts: 0,
      followers: 0,
      following: 0,
    });
  });

  it('Should not be able to show user stats with an invalid loggedUserId', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    expect(
      showUserStatsService.execute({
        nickname: user.nickname,
        loggedUserId: 'invalid-logged-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to show user stats with a non verified account', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    expect(
      showUserStatsService.execute({
        nickname: user.nickname,
        loggedUserId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to show user stats with a non existing user', async () => {
    const user = fakeUsersRepository.create({
      name: 'John Doe',
      nickname: 'johndoe',
      email: 'johndoe@example.com',
      phone_number: '+5511123456789',
      password: '123456',
      confirmation_code: '123456',
    });

    user.confirmation_status = true;

    expect(
      showUserStatsService.execute({
        nickname: 'invalid-nickname',
        loggedUserId: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
