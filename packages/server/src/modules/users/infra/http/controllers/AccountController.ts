import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ActivateAccountService from '@modules/users/services/ActivateAccountService';
// import DeleteAccountService from '@modules/users/services/DeleteAccountService';

export default class AccountController {
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

  /*   public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const loggedUserId = request.user.id;

    const deleteAccount = container.resolve(DeleteAccountService);

    await deleteAccount.execute({ loggedUserId });

    return response.status(204).json();
  } */
}
