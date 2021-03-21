import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/containers/providers/StorageProvider/models/IStorageProvider';

interface IRequestDTO {
  userId: string;
  avatarFilename: string;
  avatarPreviewHash: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    userId,
    avatarFilename,
    avatarPreviewHash,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User was not found');
    }

    if (!user.confirmation_status) {
      throw new AppError('You need to verify your account');
    }

    if (user.avatar_url) {
      await this.storageProvider.deleteFile(user.avatar_url);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar_url = filename;
    user.avatar_preview_hash = avatarPreviewHash;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
