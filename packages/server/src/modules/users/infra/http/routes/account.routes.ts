import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AccountController from '../controllers/AccountController';
import SMSAccountCodeController from '../controllers/SMSAccountCodeController';

const accountRouter = Router();

const accountController = new AccountController();
const smsAccountCodeController = new SMSAccountCodeController();

accountRouter.post(
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
  accountController.create,
);

accountRouter.get(
  '/activate/code/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  smsAccountCodeController.show,
);

accountRouter.patch(
  '/activate/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      confirmation_code: Joi.string().required(),
    },
  }),
  accountController.update,
);

export default accountRouter;
