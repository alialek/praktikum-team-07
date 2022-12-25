import { Router } from 'express';
import { appRoutes } from '@/routes/app';

const router: Router = Router();

appRoutes(router);

export default router;
