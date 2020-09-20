import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RedefineUserPasswordService from '@modules/users/services/RedefineUserPasswordService';

export default class passwordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { oldPassword, password } = request.body;

    const redefinePassword = container.resolve(RedefineUserPasswordService);

    const updatedUser = await redefinePassword.execute({
      userId: user_id,
      oldPassword,
      password,
    });

    return response.json(updatedUser);
  }
}
