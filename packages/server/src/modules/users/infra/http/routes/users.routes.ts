import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserPhoneNumberController from '../controllers/UserPhoneNumberController';
import UserAvatarController from '../controllers/UserAvatarController';

const userPhoneNumberController = new UserPhoneNumberController();
const userAvatarController = new UserAvatarController();

const usersRouter = Router();

const upload = multer(uploadConfig.multer);

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
