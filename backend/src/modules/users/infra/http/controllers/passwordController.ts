import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePasswordService from '@modules/users/services/UpdatePasswordService';

export default class passwordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { oldPassword, password } = request.body;

    const updatePassword = container.resolve(UpdatePasswordService);

    const updatedUser = await updatePassword.execute({
      userId: user_id,
      oldPassword,
      password,
    });

    return response.json(updatedUser);
  }
}
