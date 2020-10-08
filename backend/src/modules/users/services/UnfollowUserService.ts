import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IFollowersRepository from '../repositories/IFollowersRepository';

interface IRequestDTO {
  loggedUserId: string;
  followedUserId: string;
}

@injectable()
class UnfollowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FollowersRepository')
    private followersRepository: IFollowersRepository,
  ) {}

  public async execute({
    loggedUserId,
    followedUserId,
  }: IRequestDTO): Promise<void> {
    const loggedUser = await this.usersRepository.findById(loggedUserId);

    if (!loggedUser) {
      throw new AppError('Invalid logged user id');
    }

    const followedUser = await this.usersRepository.findById(followedUserId);

    if (!followedUser) {
      throw new AppError('Invalid followed user id');
    }

    if (loggedUserId === followedUserId) {
      throw new AppError('You cannot unfollow yourself');
    }

    const followFound = await this.followersRepository.findFollow({
      loggedUserId,
      followedUserId,
    });

    if (!followFound) {
      throw new AppError('You are not following this user');
    }

    await this.followersRepository.unfollow({ loggedUserId, followedUserId });
  }
}

export default UnfollowUserService;
