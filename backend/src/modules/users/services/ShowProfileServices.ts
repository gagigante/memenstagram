import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  nickname: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ nickname }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findByNickname(nickname);

    if (!user) {
      throw new AppError('User not found');
    }

    if (!user.confirmation_status) {
      throw new AppError('You need to verify your account.');
    }

    return classToClass(user);
  }
}

export default ShowProfileService;
