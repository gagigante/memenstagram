import IFollowersRepository from '@modules/users/repositories/IFollowersRepository';
import { getRepository, In, Repository } from 'typeorm';

import IFollowUserDTO from '@modules/users/dtos/IFollowUserDTO';
import Follower from '../entities/Follower';
import User from '../entities/User';

class FollowersRepository implements IFollowersRepository {
  private ormFollowerRepository: Repository<Follower>;

  private ormUserRepository: Repository<User>;

  constructor() {
    this.ormFollowerRepository = getRepository(Follower);
    this.ormUserRepository = getRepository(User);
  }

  public async follow({
    loggedUserId,
    followedUserId,
  }: IFollowUserDTO): Promise<void> {
    const newFollow = this.ormFollowerRepository.create({
      user_id: loggedUserId,
      followed_user_id: followedUserId,
    });

    await this.ormFollowerRepository.save(newFollow);
  }

  public async unfollow({
    loggedUserId,
    followedUserId,
  }: IFollowUserDTO): Promise<void> {
    const follow = await this.ormFollowerRepository.findOne({
      where: {
        user_id: loggedUserId,
        followed_user_id: followedUserId,
      },
    });

    await this.ormFollowerRepository.remove(follow);
  }

  public async findFollow({
    loggedUserId,
    followedUserId,
  }: IFollowUserDTO): Promise<Follower | undefined> {
    const follow = await this.ormFollowerRepository.findOne({
      where: {
        user_id: loggedUserId,
        followed_user_id: followedUserId,
      },
    });

    return follow;
  }

  public async showUserFollowers(userId: string): Promise<[User[], number]> {
    const followers = await this.ormFollowerRepository.find({
      where: {
        followed_user_id: userId,
      },
    });

    if (followers.length !== 0) {
      const followersId = followers.map(item => {
        return item.user_id;
      });

      const users = await this.ormUserRepository.findAndCount({
        where: {
          id: In(followersId),
        },
      });

      return users;
    }

    return [[], 0];
  }

  public async showUserFollows(userId: string): Promise<[User[], number]> {
    const follows = await this.ormFollowerRepository.find({
      where: {
        user_id: userId,
      },
    });

    if (follows.length !== 0) {
      const followsId = follows.map(item => {
        return item.followed_user_id;
      });

      const users = await this.ormUserRepository.findAndCount({
        where: {
          id: In(followsId),
        },
      });

      return users;
    }

    return [[], 0];
  }
}

export default FollowersRepository;
