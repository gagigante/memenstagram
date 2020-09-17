import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AccountController from '../controllers/AccountController';
import SMSAccountCodeController from '../controllers/SMSAccountCodeController';

const accountRouter = Router();

const accountController = new AccountController();
const smsAccountCodeController = new SMSAccountCodeController();

accountRouter.get(
  '/code/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  smsAccountCodeController.send,
);

accountRouter.patch(
  '/:user_id',
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
