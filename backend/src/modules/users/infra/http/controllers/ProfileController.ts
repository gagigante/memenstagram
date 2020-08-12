import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileServices';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { nickname } = request.params;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ nickname });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, nickname, email, bio, oldPassword, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      userId,
      name,
      email,
      nickname,
      bio,
      oldPassword,
      password,
    });

    return response.json(classToClass(user));
  }
}
