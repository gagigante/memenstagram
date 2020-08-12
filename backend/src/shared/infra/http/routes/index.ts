import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';
import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes';
import accountRouter from '@modules/users/infra/http/routes/account.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/profile', profileRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/activate', accountRouter);

export default routes;
