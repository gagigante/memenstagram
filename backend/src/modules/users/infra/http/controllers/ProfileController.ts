import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowProfileService from '@modules/users/services/ShowUserProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const loggedUserId = request.user.id;
    const { nickname } = request.params;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ nickname, loggedUserId });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, nickname, email, bio, oldPassword, password } = request.body;

    const updateProfile = container.resolve(UpdateUserProfileService);

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
