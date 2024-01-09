import { Express, Router } from 'express';
import usersRouter from '../routes/user-routes';
import healthyRouter from '../routes/healthcheck';
import swaggerRoutes from '../doc/swagger-config';

export default (app: Express): void => {
  const router = Router();
  app.use('/', swaggerRoutes);
  app.use('/api', router);
  usersRouter(router);
  healthyRouter(router);
};
