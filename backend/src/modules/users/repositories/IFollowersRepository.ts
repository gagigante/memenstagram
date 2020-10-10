import IFollowUserDTO from '@modules/users/dtos/IFollowUserDTO';
import Follower from '../infra/typeorm/entities/Follower';
import User from '../infra/typeorm/entities/User';

export default interface IFollowersRepository {
  follow({ loggedUserId, followedUserId }: IFollowUserDTO): Promise<void>;
  unfollow({ loggedUserId, followedUserId }: IFollowUserDTO): Promise<void>;
  findFollow({
    loggedUserId,
    followedUserId,
  }: IFollowUserDTO): Promise<Follower | undefined>;
  showUserFollowers(userId: string): Promise<User[]>;
  showUserFollows(userId: string): Promise<User[]>;
}
