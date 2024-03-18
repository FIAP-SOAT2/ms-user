import { Router } from 'express';

export default (router: Router): void => {
  router.get('/ms-user/health-check', (_req, res) => {
    console.log('Healthy!');
    return res.sendStatus(200);
  });
};
