import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowUserFollowsAndFollowersService from '@modules/users/services/ShowUserFollowsAndFollowersService';
import FollowUserService from '@modules/users/services/FollowUserService';
import UnfollowUserService from '@modules/users/services/UnfollowUserService';

export default class FollowController {
  public async index(request: Request, response: Response): Promise<Response> {
    const loggedUserId = request.user.id;

    const showUserFollowsAndFollowersService = container.resolve(
      ShowUserFollowsAndFollowersService,
    );

    const userFollowsAndFollowers = await showUserFollowsAndFollowersService.execute(
      { userId: loggedUserId },
    );

    return response.json(userFollowsAndFollowers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const loggedUserId = request.user.id;
    const { followedUserId } = request.params;

    const followUser = container.resolve(FollowUserService);

    await followUser.execute({ loggedUserId, followedUserId });

    return response.status(204).send();
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const loggedUserId = request.user.id;
    const { followedUserId } = request.params;

    const unfollowUser = container.resolve(UnfollowUserService);

    await unfollowUser.execute({ loggedUserId, followedUserId });

    return response.status(204).send();
  }
}
