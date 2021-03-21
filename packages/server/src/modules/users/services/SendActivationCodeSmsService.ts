import { injectable, inject } from 'tsyringe';
import crypto from 'crypto';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';
import ISMSProvider from '@shared/containers/providers/SMSProvider/models/ISmsProvider';

interface IRequestDTO {
  userId: string;
}

@injectable()
class SendActivationCodeSmsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('SMSProvider')
    private smsProvider: ISMSProvider,
  ) {}

  public async execute({ userId }: IRequestDTO): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User was not found');
    }

    user.confirmation_code = crypto.randomBytes(3).toString('hex');

    await this.usersRepository.save(user);

    return this.smsProvider.sendSMS({
      phoneNumber: user.phone_number,
      message: `Your verification code is ${user.confirmation_code}`,
    });
  }
}

export default SendActivationCodeSmsService;
