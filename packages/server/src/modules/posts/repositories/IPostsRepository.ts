import ICreatePostDTO from '../dtos/ICreatePostDTO';
import Post from '../infra/typeorm/entities/Post';

export default interface IPostsRepository {
  findPost(postId: string): Promise<Post>;
  findUserPosts(userId: string): Promise<[Post[], number]>;
  create(data: ICreatePostDTO): Post;
  save(data: Post): Promise<Post>;
  delete(postId: string): Promise<void>;
}
