import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import SendActivationCodeSmsService from '@modules/users/services/SendActivationCodeSmsService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, nickname, email, phone_number, password } = request.body;

    const createUser = container.resolve(CreateUserService);
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

    return response.json(classToClass(user));
  }
}
