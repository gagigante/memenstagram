import IFollowUserDTO from '@modules/users/dtos/IFollowUserDTO';
import Follower from '../infra/typeorm/entities/Follower';

export default interface IUsersRepository {
  follow({ loggedUserId, followedUserId }: IFollowUserDTO): Promise<void>;
  unfollow({ loggedUserId, followedUserId }: IFollowUserDTO): Promise<void>;
  findFollow({
    loggedUserId,
    followedUserId,
  }: IFollowUserDTO): Promise<Follower | undefined>;
  showUserFollowers(userId: string): Promise<Follower[]>;
  showFollowedUsers(userId: string): Promise<Follower[]>;
}
