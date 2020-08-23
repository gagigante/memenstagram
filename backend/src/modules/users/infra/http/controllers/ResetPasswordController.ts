import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { phone_number } = request.params;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      phoneNumber: phone_number,
    });

    return response.status(204).json();
  }
}
