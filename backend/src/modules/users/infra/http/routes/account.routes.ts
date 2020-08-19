import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AccountController from '../controllers/AccountController';
import SMSAccountCodeController from '../controllers/SMSAccountCodeController';

const accountController = new AccountController();
const smsAccountCodeController = new SMSAccountCodeController();

const accountRouter = Router();

accountRouter.get(
  '/code',
  celebrate({
    [Segments.BODY]: {
      phone_number: Joi.string().required(),
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
