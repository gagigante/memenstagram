import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  userId: string;
  name: string;
  nickname: string;
  email: string;
  bio: string;
  password?: string;
  oldPassword?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    name,
    nickname,
    email,
    bio,
    password,
    oldPassword,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User was not found.');
    }

    if (!user.confirmation_status) {
      throw new AppError('You need to verify your account.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
      throw new AppError('E-mail already in use');
    }

    const userWithUpdatedNickname = await this.usersRepository.findByNickname(
      nickname,
    );

    if (userWithUpdatedNickname && userWithUpdatedNickname.id !== userId) {
      throw new AppError('Nickname already in use');
    }

    user.name = name;
    user.nickname = nickname;
    user.email = email;
    user.bio = bio;

    if (password && !oldPassword) {
      throw new AppError('Invalid old password');
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
