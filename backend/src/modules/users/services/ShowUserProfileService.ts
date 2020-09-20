import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  loggedUserId: string;
  nickname: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ nickname, loggedUserId }: IRequestDTO): Promise<User> {
    const loggedUser = await this.usersRepository.findById(loggedUserId);

    if (!loggedUser) {
      throw new AppError('Invalid logged user id');
    }

    if (!loggedUser.confirmation_status) {
      throw new AppError('You need to verify your account.');
    }

    const user = await this.usersRepository.findByNickname(nickname);

    if (!user || !user.confirmation_status) {
      throw new AppError('User was not found.');
    }

    return classToClass(user);
  }
}

export default ShowProfileService;
