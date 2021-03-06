import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

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

    if (!user.is_reseted) {
      throw new AppError('Password is not reseted');
    }

    const checkOldPassword = await this.hashProvider.compareHash(
      oldPassword,
      user.password,
    );

    if (!checkOldPassword) {
      throw new AppError('Old password does not match');
    }

    user.password = await this.hashProvider.generateHash(password);
    user.is_reseted = false;

    await this.usersRepository.save(user);

    return classToClass(user);
  }
}

export default UpdateUserAvatarService;
