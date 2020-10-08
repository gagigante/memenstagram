import IFollowersRepository from '@modules/users/repositories/IFollowersRepository';
import { getRepository, Repository } from 'typeorm';

import IFollowUserDTO from '@modules/users/dtos/IFollowUserDTO';
import Follower from '../entities/Follower';

class FollowersRepository implements IFollowersRepository {
  private ormRepository: Repository<Follower>;

  constructor() {
    this.ormRepository = getRepository(Follower);
  }

  public async follow({
    loggedUserId,
    followedUserId,
  }: IFollowUserDTO): Promise<void> {
    const newFollow = this.ormRepository.create({
      user_id: loggedUserId,
      followed_user_id: followedUserId,
    });

    await this.ormRepository.save(newFollow);
  }

  public async unfollow({
    loggedUserId,
    followedUserId,
  }: IFollowUserDTO): Promise<void> {
    const follow = await this.ormRepository.findOne({
      where: {
        user_id: loggedUserId,
        followed_user_id: followedUserId,
      },
    });

    await this.ormRepository.remove(follow);
  }

  public async findFollow({
    loggedUserId,
    followedUserId,
  }: IFollowUserDTO): Promise<Follower | undefined> {
    const follow = await this.ormRepository.findOne({
      where: {
        user_id: loggedUserId,
        followed_user_id: followedUserId,
      },
    });

    return follow;
  }

  public async showUserFollowers(userId: string): Promise<Follower[]> {
    const followers = await this.ormRepository.find({
      where: {
        followed_user_id: userId,
      },
    });

    return followers;
  }

  public async showFollowedUsers(userId: string): Promise<Follower[]> {
    const followers = await this.ormRepository.find({
      where: {
        followed_user_id: userId,
      },
    });

    return followers;
  }
}

export default FollowersRepository;
