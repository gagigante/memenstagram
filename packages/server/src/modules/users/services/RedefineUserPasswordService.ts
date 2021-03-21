import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  userId: string;
  oldPassword: string;
  password: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    oldPassword,
    password,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User was not found');
    }

    if (!user.confirmation_status) {
      throw new AppError('You need to verify your account');
    }

    if (!user.should_update_password) {
      throw new AppError('Password is not redefined');
    }

    const checkOldPassword = await this.hashProvider.compareHash(
      oldPassword,
      user.password,
    );

    if (!checkOldPassword) {
      throw new AppError('Old password does not match');
    }

    user.password = await this.hashProvider.generateHash(password);
    user.should_update_password = false;

    await this.usersRepository.save(user);

    return classToClass(user);
  }
}

export default UpdateUserAvatarService;
