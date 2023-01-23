import { Router } from 'express';

import { apiRouter } from '@/routes/api';
import { clientRouter } from '@/routes/client';

export const appRouter = Router();

appRouter.use('/api/v1', apiRouter);
appRouter.use(clientRouter);
