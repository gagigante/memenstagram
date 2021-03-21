import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFollowersRepository from '@modules/users/repositories/IFollowersRepository';

import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  loggedUserId: string;
  followedUserId: string;
}

@injectable()
class FollowUserService {
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
      throw new AppError('User was not found');
    }

    if (!loggedUser.confirmation_status) {
      throw new AppError('You need to verify your account');
    }

    const followedUser = await this.usersRepository.findById(followedUserId);

    if (!followedUser || !followedUser.confirmation_status) {
      throw new AppError('User to be followed was not found');
    }

    if (loggedUserId === followedUserId) {
      throw new AppError('You cannot follow yourself');
    }

    const followFound = await this.followersRepository.findFollow({
      loggedUserId,
      followedUserId,
    });

    if (followFound) {
      throw new AppError('You are already following this user');
    }

    await this.followersRepository.follow({ loggedUserId, followedUserId });
  }
}

export default FollowUserService;
