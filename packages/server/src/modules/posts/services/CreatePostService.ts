import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/containers/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequestDTO {
  loggedUserId: string;
  description: string;
  postImages: { image_url: string }[];
}

@injectable()
class CreatePostService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    loggedUserId,
    description,
    postImages,
  }: IRequestDTO): Promise<Post> {
    const loggedUser = await this.usersRepository.findById(loggedUserId);

    if (!loggedUser) {
      throw new AppError('User was not found');
    }

    if (!loggedUser.confirmation_status) {
      throw new AppError('You need to verify your account');
    }

    const data = {
      user_id: loggedUserId,
      description,
      postImages,
    };

    postImages.map(async (postImage) => {
      await this.storageProvider.saveFile(postImage.image_url);
    });

    const post = this.postsRepository.create(data);

    await this.postsRepository.save(post);

    return post;
  }
}

export default CreatePostService;
