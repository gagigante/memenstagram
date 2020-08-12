import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import uploadConfig from '@config/upload';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  nickname: string;

  @Column()
  bio: string;

  @Column()
  @Exclude()
  confirmation_code: string;

  @Column()
  @Exclude()
  confirmation_status: boolean;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar_url: string;

  @Column()
  posts_qtt: number;

  @Column()
  followers_qtt: number;

  @Column()
  follows_qtt: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar_url) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar_url}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar_url}`;
      default:
        return null;
    }
  }
}

export default User;
