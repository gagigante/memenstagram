import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ActivateAccountService from '@modules/users/services/ActivateAccountService';

export default class AccountController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id, confirmation_code } = request.body;

    const activateAccount = container.resolve(ActivateAccountService);

    const updatedUser = await activateAccount.execute({
      user_id,
      confirmation_code,
    });

    return response.json(classToClass(updatedUser));
  }
}
