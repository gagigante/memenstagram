import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePostService from '@modules/posts/services/CreatePostService';

export default class PostsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const loggedUserId = request.user.id;
    const { description } = request.body;

    const requestPostImages = request.files as Express.Multer.File[];

    const postImages = requestPostImages.map(image => {
      return { image_url: image.filename };
    });

    const createPostService = container.resolve(CreatePostService);

    const post = await createPostService.execute({
      loggedUserId,
      description,
      postImages,
    });

    return response.json(post);
  }
}
