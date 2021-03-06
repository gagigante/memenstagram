import { injectable, inject } from 'tsyringe';
import crypto from 'crypto';

import AppError from '@shared/errors/AppError';

import ISMSProvider from '@shared/containers/providers/SMSProvider/models/ISMSProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

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
    private smsProvider: ISMSProvider,
  ) {}

  public async execute({ phoneNumber }: IRequestDTO): Promise<void> {
    const user = await this.usersRepository.findByPhoneNumber(phoneNumber);

    if (!user) {
      throw new AppError('User was not found');
    }

    const resetedPassword = crypto.randomBytes(3).toString('hex');

    user.is_reseted = true;
    user.password = await this.hashProvider.generateHash(resetedPassword);

    await this.usersRepository.save(user);

    return this.smsProvider.sendSMS({
      phoneNumber,
      message: `Your temporary password is ${resetedPassword}`,
    });
  }
}

export default ResetPasswordService;
