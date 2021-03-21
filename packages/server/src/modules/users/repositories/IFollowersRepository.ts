import User from '@modules/users/infra/typeorm/entities/User';
import Follower from '@modules/users/infra/typeorm/entities/Follower';
import IFollowUserDTO from '@modules/users/dtos/IFollowUserDTO';


export default interface IFollowersRepository {
  follow(data: IFollowUserDTO): Promise<void>;
  unfollow(data: IFollowUserDTO): Promise<void>;
  findFollow(data: IFollowUserDTO): Promise<Follower | undefined>;
  showUserFollowers(userId: string): Promise<[User[], number]>;
  showUserFollows(userId: string): Promise<[User[], number]>;
}
