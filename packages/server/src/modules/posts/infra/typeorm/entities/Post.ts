import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import PostImage from './PostImage';
import PostComment from './PostComment';
import PostLike from './PostLike';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => PostImage, postImage => postImage.post, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'post_id' })
  postImages: PostImage[];

  @OneToMany(() => PostComment, postComment => postComment.post, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'post_id' })
  postComments: PostComment[];

  @OneToMany(() => PostLike, postLike => postLike.post, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'post_id' })
  postLikes: PostLike[];
}

export default Post;
