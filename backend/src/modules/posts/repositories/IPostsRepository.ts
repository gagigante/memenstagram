// import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
// import IFollowUserDTO from '@modules/users/dtos/IFollowUserDTO';
// import Follower from '../infra/typeorm/entities/Follower';
// import User from '../infra/typeorm/entities/User';
import Post from '../infra/typeorm/entities/Post';

export default interface IPostsRepository {
  // createPost(data: ICreatePostDTO): Promise<void>;
  getUserPosts(userId: string): Promise<[Post[], number]>;
}
