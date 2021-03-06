import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  user_id: string;
  confirmation_code: string;
}

@injectable()
class ActivateAccountService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    confirmation_code,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User was not found');
    }

    if (user.confirmation_status) {
      throw new AppError('Account is already verified');
    }

    if (user.confirmation_code !== confirmation_code) {
      throw new AppError('Invalid confirmation code');
    }

    user.confirmation_status = true;

    const updatedUser = await this.usersRepository.save(user);

    return classToClass(updatedUser);
  }
}

export default ActivateAccountService;
