import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import FollowController from '../controllers/FollowController';

const followRouter = Router();

const followController = new FollowController();

followRouter.use(ensureAuthenticated);

followRouter.get(
  '/follow-data/:nickname',
  celebrate({
    [Segments.PARAMS]: {
      nickname: Joi.string().required(),
    },
  }),
  followController.index,
);

followRouter.get(
  '/follow/:followedUserId',
  celebrate({
    [Segments.PARAMS]: {
      followedUserId: Joi.string().uuid().required(),
    },
  }),
  followController.create,
);

followRouter.delete(
  '/unfollow/:followedUserId',
  celebrate({
    [Segments.PARAMS]: {
      followedUserId: Joi.string().uuid().required(),
    },
  }),
  followController.destroy,
);

export default followRouter;
