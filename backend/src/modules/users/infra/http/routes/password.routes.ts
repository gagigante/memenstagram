import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/reset/:phone_number',
  celebrate({
    [Segments.PARAMS]: {
      phone_number: Joi.string()
        .required()
        .regex(/^\+?[1-9]\d{4,14}$/),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
