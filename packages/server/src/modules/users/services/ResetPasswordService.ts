import { injectable, inject } from 'tsyringe';
import crypto from 'crypto';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';
import ISmsProvider from '@shared/containers/providers/SMSProvider/models/ISmsProvider';

interface IRequestDTO {
  phoneNumber: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('SMSProvider')
    private smsProvider: ISmsProvider,
  ) {}

  public async execute({ phoneNumber }: IRequestDTO): Promise<void> {
    const user = await this.usersRepository.findByPhoneNumber(phoneNumber);

    if (!user) {
      throw new AppError('User was not found');
    }

    const tempPassword = crypto.randomBytes(3).toString('hex');

    user.should_update_password = true;
    user.password = await this.hashProvider.generateHash(tempPassword);

    await this.usersRepository.save(user);

    return this.smsProvider.sendSMS({
      phoneNumber,
      message: `Your temporary password is ${tempPassword}`,
    });
  }
}

export default ResetPasswordService;
