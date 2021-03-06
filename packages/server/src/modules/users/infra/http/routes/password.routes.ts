import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PasswordController from '../controllers/passwordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

const resetPasswordController = new ResetPasswordController();
const passwordController = new PasswordController();

passwordRouter.post(
  '/reset/:phone_number',
  celebrate({
    [Segments.PARAMS]: {
      phone_number: Joi.string()
        .required()
        .regex(/^\+\d{1,3}\d{1,14}(\s\d{1,13})?/),
    },
  }),
  resetPasswordController.create,
);

passwordRouter.patch(
  '/redefine/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      oldPassword: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  passwordController.update,
);

export default passwordRouter;
