import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAccountService from '@modules/users/services/CreateAccountService';
import SendActivationCodeSmsService from '@modules/users/services/SendActivationCodeSmsService';
import ActivateAccountService from '@modules/users/services/ActivateAccountService';

export default class AccountController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, nickname, email, phone_number, password } = request.body;

    const createUser = container.resolve(CreateAccountService);
    const sendActivationCodeSmsService = container.resolve(
      SendActivationCodeSmsService,
    );

    const user = await createUser.execute({
      name,
      nickname,
      email,
      phoneNumber: phone_number,
      password,
    });

    await sendActivationCodeSmsService.execute({ userId: user.id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { confirmation_code } = request.body;

    const activateAccount = container.resolve(ActivateAccountService);

    const updatedUser = await activateAccount.execute({
      user_id,
      confirmation_code,
    });

    return response.json(classToClass(updatedUser));
  }
}
