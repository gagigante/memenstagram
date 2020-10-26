import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';
import Post from './Post';

@Entity('post_images')
class PostImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Post, posts => posts.postLikes)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Expose({ name: 'image_url' })
  getPostImageUrl(): string {
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image_url}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.image_url}`;
      default:
        return `${process.env.APP_API_URL}/files/${this.image_url}`;
    }
  }
}

export default PostImage;
