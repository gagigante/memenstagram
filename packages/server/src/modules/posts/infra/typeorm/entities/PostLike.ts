import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Post from './Post';

@Entity('post_likes')
class PostLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_who_liked_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_who_liked_id' })
  userWhoLiked: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Post, posts => posts.postLikes)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}

export default PostLike;
