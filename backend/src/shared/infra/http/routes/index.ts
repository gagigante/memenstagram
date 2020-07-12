import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

// routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRoutes);

export default routes;
