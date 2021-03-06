import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
import Post from '@modules/posts/infra/typeorm/entities/Post';
import PostImage from '@modules/posts/infra/typeorm/entities/PostImage';
import { uuid } from 'uuidv4';
import IPostsRepository from '../IPostsRepository';

class FakePostsRepository implements IPostsRepository {
  private posts: Post[] = [];

  private postImages: PostImage[] = [];

  public async findPost(postId: string): Promise<Post> {
    const post = this.posts.find(item => item.id === postId);

    const postImages = this.postImages.filter(item => item.post_id === postId);

    post.postImages = postImages;

    return post;
  }

  public async findUserPosts(userId: string): Promise<[Post[], number]> {
    const posts = this.posts.filter(item => item.user_id === userId);

    const postsWithImages = posts.map(post => {
      const postWithImages = post;

      postWithImages.postImages = this.postImages.filter(
        image => image.post_id === post.id,
      );

      return postWithImages;
    });

    return [postsWithImages, posts.length];
  }

  public create({ postImages, ...rest }: ICreatePostDTO): Post {
    const post = new Post();

    Object.assign(post, { id: uuid(), ...rest });

    this.posts.push(post);

    const images = postImages.map(postImage => {
      const image = new PostImage();

      Object.assign(image, {
        id: uuid(),
        image_url: postImage.image_url,
        post_id: post.id,
      });

      return image;
    });

    this.postImages.push(...images);

    post.postImages = images;

    return post;
  }

  public async save(data: Post): Promise<Post> {
    let findIndex = this.posts.findIndex(item => item.id === data.id);

    this.posts[findIndex] = data;

    data.postImages.map(postImage => {
      findIndex = this.postImages.findIndex(item => item.id === postImage.id);

      this.postImages[findIndex] = postImage;

      return postImage;
    });

    return data;
  }

  public async delete(postId: string): Promise<void> {
    const posts = this.posts.filter(item => item.id !== postId);
    const images = this.postImages.filter(item => item.post_id !== postId);

    this.posts = posts;
    this.postImages = images;
  }
}

export default FakePostsRepository;
