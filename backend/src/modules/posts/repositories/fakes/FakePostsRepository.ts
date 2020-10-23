import Post from '@modules/posts/infra/typeorm/entities/Post';
import IPostsRepository from '../IPostsRepository';

// import Follower from '@modules/users/infra/typeorm/entities/Follower';
// import User from '@modules/users/infra/typeorm/entities/User';
// import IFollowersRepository from '../IFollowersRepository';
// import IFollowUserDTO from '../../dtos/IFollowUserDTO';

class FakePostsRepository implements IPostsRepository {
  private posts: Post[] = [];

  public async getUserPosts(userId: string): Promise<[Post[], number]> {
    const posts = this.posts.filter(item => item.user_id === userId);

    return [posts, posts.length];
  }
}

export default FakePostsRepository;
