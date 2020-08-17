import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AccountController from '../controllers/AccountController';

const accountController = new AccountController();

const accountRouter = Router();

// accountRouter.use(ensureAuthenticated);

accountRouter.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      confirmation_code: Joi.string().required(),
    },
  }),
  accountController.update,
);

export default accountRouter;
