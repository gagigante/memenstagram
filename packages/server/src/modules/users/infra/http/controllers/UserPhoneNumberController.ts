import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserPhoneNumberService from '@modules/users/services/UpdateUserPhoneNumberService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { phone_number } = request.body;

    const updateUserPhoneNumber = container.resolve(
      UpdateUserPhoneNumberService,
    );

    const user = await updateUserPhoneNumber.execute({
      userId,
      phoneNumber: phone_number,
    });

    return response.json(classToClass(user));
  }
}
