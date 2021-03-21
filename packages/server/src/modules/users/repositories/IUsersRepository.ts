import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByPhoneNumber(phoneNumber: string): Promise<User | undefined>;
  findByNickname(nickname: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): User;
  save(user: User): Promise<User>;
}
