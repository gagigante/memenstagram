import ICreatePostDTO from '../dtos/ICreatePostDTO';
import Post from '../infra/typeorm/entities/Post';

export default interface IPostsRepository {
  createPost(data: ICreatePostDTO): Promise<Post>;
  getUserPosts(userId: string): Promise<[Post[], number]>;
}
