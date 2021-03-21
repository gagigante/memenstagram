import { Router } from 'express';
import multer from 'multer';
// import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import PostsController from '../controllers/PostsController';

const postsController = new PostsController();

const postRouter = Router();

const upload = multer(uploadConfig.multer);

postRouter.use(ensureAuthenticated);

postRouter.post(
  '/',
  // VALIDAR ROTA
  upload.array('images'),
  postsController.create,
);

export default postRouter;
