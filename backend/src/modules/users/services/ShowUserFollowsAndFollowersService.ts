import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IFollowersRepository from '../repositories/IFollowersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  userId: string;
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

  public async execute({ userId }: IRequestDTO): Promise<IResponseDTO> {
    const loggedUser = await this.usersRepository.findById(userId);

    if (!loggedUser) {
      throw new AppError('User was not found');
    }

    const [follows] = await this.followersRepository.showUserFollows(userId);
    const [followers] = await this.followersRepository.showUserFollowers(
      userId,
    );

    return {
      follows: classToClass(follows),
      followers: classToClass(followers),
    };
  }
}

export default ShowUserFollowsAndFollowers;
