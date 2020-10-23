import { getRepository, Repository } from 'typeorm';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';

import Post from '../entities/Post';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
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
