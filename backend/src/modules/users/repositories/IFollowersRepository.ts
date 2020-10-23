import IFollowUserDTO from '@modules/users/dtos/IFollowUserDTO';
import Follower from '../infra/typeorm/entities/Follower';
import User from '../infra/typeorm/entities/User';

export default interface IFollowersRepository {
  follow(data: IFollowUserDTO): Promise<void>;
  unfollow(data: IFollowUserDTO): Promise<void>;
  findFollow(data: IFollowUserDTO): Promise<Follower | undefined>;
  showUserFollowers(userId: string): Promise<[User[], number]>;
  showUserFollows(userId: string): Promise<[User[], number]>;
}
