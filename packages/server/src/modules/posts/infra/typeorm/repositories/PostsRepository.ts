import { getRepository, Repository } from 'typeorm';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';

import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
import Post from '../entities/Post';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async createPost({
    user_id,
    description,
    postImages,
  }: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create({
      user_id,
      description,
      postImages,
    });

    await this.ormRepository.save(post);

    return post;
  }

  public async getUserPosts(userId: string): Promise<[Post[], number]> {
    const data = await this.ormRepository.findAndCount({
      where: {
        user_id: userId,
      },
    });

    return data;
  }
}

export default PostsRepository;
