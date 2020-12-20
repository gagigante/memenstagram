import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  loggedUserId: string;
}

@injectable()
class DeleteAccountService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ loggedUserId }: IRequestDTO): Promise<void> {
    const loggedUser = await this.usersRepository.findById(loggedUserId);

    if (loggedUser) {
      throw new AppError('User was not found');
    }

    //     // await this.usersRepository.(user);
    //     // Should delete User, Posts, Notifications and Follows relations
  }
}

export default DeleteAccountService;
