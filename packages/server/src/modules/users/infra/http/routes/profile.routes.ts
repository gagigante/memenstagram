import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';
import FollowController from '../controllers/FollowController';

const profileRouter = Router();

const profileController = new ProfileController();
const followController = new FollowController();

profileRouter.use(ensureAuthenticated);

profileRouter.get(
  '/:nickname',
  celebrate({
    [Segments.PARAMS]: {
      nickname: Joi.string().required(),
    },
  }),
  profileController.show,
);

profileRouter.get(
  '/:nickname/stats',
  celebrate({
    [Segments.PARAMS]: {
      nickname: Joi.string().required(),
    },
  }),
  followController.show,
);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      nickname: Joi.string().required(),
      email: Joi.string().email().required(),
      bio: Joi.string().allow(null).allow(''),
      oldPassword: Joi.string(),
      password: Joi.string().when('oldPassword', {
        is: Joi.exist(),
        then: Joi.string().required(),
        otherwise: Joi.string().optional(),
      }),
    },
  }),
  profileController.update,
);

export default profileRouter;
