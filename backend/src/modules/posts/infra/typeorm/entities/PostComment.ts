import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import Post from './Post';

@Entity('post_comments')
class PostComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_who_commented_id: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_who_commented_id' })
  userWhoCommented: User;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Post, posts => posts.postComments)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}

export default PostComment;
