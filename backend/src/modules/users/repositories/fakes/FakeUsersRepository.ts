import { uuid } from 'uuidv4';

import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(item => item.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(item => item.email === email);

    return user;
  }

  public async findByPhoneNumber(
    phoneNumber: string,
  ): Promise<User | undefined> {
    const user = this.users.find(item => item.phone_number === phoneNumber);

    return user;
  }

  public async findByNickname(nickname: string): Promise<User | undefined> {
    const user = this.users.find(item => item.nickname === nickname);

    return user;
  }

  public create(data: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, { id: uuid(), ...data });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(item => item.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
