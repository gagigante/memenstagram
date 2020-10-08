import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IFollowersRepository from '@modules/users/repositories/IFollowersRepository';
import FollowersRepository from '@modules/users/infra/typeorm/repositories/FollowersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IFollowersRepository>(
  'FollowersRepository',
  FollowersRepository,
);
