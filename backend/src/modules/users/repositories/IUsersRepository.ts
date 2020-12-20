import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByPhoneNumber(phoneNumber: string): Promise<User | undefined>;
  findByNickname(nickname: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): User;
  save(user: User): Promise<User>;
  // delete(id: string): Promise<void>;
}
