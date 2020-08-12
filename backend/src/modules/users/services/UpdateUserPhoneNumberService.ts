import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  userId: string;
  phoneNumber: string;
}

@injectable()
class UpdateUserPhoneNumberService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, phoneNumber }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User was not found.');
    }

    if (!user.confirmation_status) {
      throw new AppError('You need to verify your account.');
    }

    const userWithUpdatedPhoneNumber = await this.usersRepository.findByPhoneNumber(
      phoneNumber,
    );

    // this.value.match(/^(?=.{0,10}$)\d{0,9}(\.\d{1,2})?$/);

    if (
      userWithUpdatedPhoneNumber &&
      userWithUpdatedPhoneNumber.id !== userId
    ) {
      throw new AppError('Phone number already in use');
    }

    user.confirmation_status = false;
    user.phone_number = phoneNumber;

    await this.usersRepository.save(user);

    return classToClass(user);
  }
}

export default UpdateUserPhoneNumberService;
