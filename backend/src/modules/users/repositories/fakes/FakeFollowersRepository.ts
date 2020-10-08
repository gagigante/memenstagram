import { uuid } from 'uuidv4';

import Follower from '@modules/users/infra/typeorm/entities/Follower';
import IFollowersRepository from '../IFollowersRepository';
import IFollowUserDTO from '../../dtos/IFollowUserDTO';

class FakeFollowersRepository implements IFollowersRepository {
  private followers: Follower[] = [];

  public async follow({
    loggedUserId,
    followedUserId,
  }: IFollowUserDTO): Promise<void> {
    const follow = new Follower();

    Object.assign(follow, {
      id: uuid(),
      user_id: loggedUserId,
      followed_user_id: followedUserId,
    });

    this.followers.push(follow);
  }

  public async unfollow({
    loggedUserId,
    followedUserId,
  }: IFollowUserDTO): Promise<void> {
    this.followers.splice(
      this.followers.findIndex(
        item =>
          item.user_id === loggedUserId &&
          item.followed_user_id === followedUserId,
      ),
      1,
    );
  }

  public async findFollow({
    loggedUserId,
    followedUserId,
  }: IFollowUserDTO): Promise<Follower> {
    return this.followers.find(
      item =>
        item.user_id === loggedUserId &&
        item.followed_user_id === followedUserId,
    );
  }

  public async showUserFollowers(userId: string): Promise<Follower[]> {
    const followers = this.followers.filter(item => item.user_id === userId);

    return followers;
  }

  public async showFollowedUsers(userId: string): Promise<Follower[]> {
    const followers = this.followers.filter(
      item => item.followed_user_id === userId,
    );

    return followers;
  }
}

export default FakeFollowersRepository;
