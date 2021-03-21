import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';
import crypto from 'crypto';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  name: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    phoneNumber,
    nickname,
    password,
  }: IRequestDTO): Promise<User> {
    let checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('E-mail already in use');
    }

    checkUserExists = await this.usersRepository.findByPhoneNumber(phoneNumber);

    if (checkUserExists) {
      throw new AppError('Phone number already in use');
    }

    checkUserExists = await this.usersRepository.findByNickname(nickname);

    if (checkUserExists) {
      throw new AppError('Nickname already in use');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      nickname,
      email,
      phone_number: phoneNumber,
      password: hashedPassword,
      confirmation_code: crypto.randomBytes(3).toString('hex'),
    });

    await this.usersRepository.save(user);

    return classToClass(user);
  }
}

export default CreateUserService;
