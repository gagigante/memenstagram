import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

import IFollowersRepository from '../repositories/IFollowersRepository';

interface IRequestDTO {
  nickname: string;
  loggedUserId: string;
}

interface IResponseDTO {
  posts: number;
  followers: number;
  following: number;
}

@injectable()
class ShowUserStatsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FollowersRepository')
    private followersRepository: IFollowersRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({
    nickname,
    loggedUserId,
  }: IRequestDTO): Promise<IResponseDTO> {
    const loggedUser = await this.usersRepository.findById(loggedUserId);

    if (!loggedUser) {
      throw new AppError('User was not found');
    }

    if (!loggedUser.confirmation_status) {
      throw new AppError('You need to verify your account');
    }

    const user = await this.usersRepository.findByNickname(nickname);

    if (!user) {
      throw new AppError('User was not found');
    }

    const [, followers] = await this.followersRepository.showUserFollowers(
      user.id,
    );

    const [, following] = await this.followersRepository.showUserFollows(
      user.id,
    );

    const [, posts] = await this.postsRepository.findUserPosts(user.id);

    return {
      posts,
      followers,
      following,
    };
  }
}

export default ShowUserStatsService;
