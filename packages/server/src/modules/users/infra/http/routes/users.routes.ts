import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UserPhoneNumberController from '../controllers/UserPhoneNumberController';
import UserAvatarController from '../controllers/UserAvatarController';
import UsersController from '../controllers/UsersController';

const usersController = new UsersController();
const userPhoneNumberController = new UserPhoneNumberController();
const userAvatarController = new UserAvatarController();

const usersRouter = Router();

const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      nickname: Joi.string().required(),
      email: Joi.string().email().required(),
      phone_number: Joi.string().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

usersRouter.patch(
  '/phone',
  celebrate({
    [Segments.BODY]: {
      phone_number: Joi.string()
        .required()
        .regex(/^\+\d{1,3}\d{1,14}(\s\d{1,13})?/),
    },
  }),
  ensureAuthenticated,
  userPhoneNumberController.update,
);

export default usersRouter;
