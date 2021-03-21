import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFollowersRepository from '@modules/users/repositories/IFollowersRepository';

import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  loggedUserId: string;
  nickname: string;
}

interface IResponseDTO {
  follows: User[];
  followers: User[];
}

@injectable()
class ShowUserFollowsAndFollowers {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FollowersRepository')
    private followersRepository: IFollowersRepository,
  ) {}

  public async execute({
    loggedUserId,
    nickname,
  }: IRequestDTO): Promise<IResponseDTO> {
    const loggedUser = await this.usersRepository.findById(loggedUserId);

    if (!loggedUser) {
      throw new AppError('User was not found');
    }

    const user = await this.usersRepository.findByNickname(nickname);

    if (!user) {
      throw new AppError('User was not found');
    }

    const [follows] = await this.followersRepository.showUserFollows(user.id);
    const [followers] = await this.followersRepository.showUserFollowers(
      user.id,
    );

    return {
      follows: classToClass(follows),
      followers: classToClass(followers),
    };
  }
}

export default ShowUserFollowsAndFollowers;
