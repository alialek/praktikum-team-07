import { Router } from 'express';
import { threadsRouter } from './threads';
import { messagesRouter } from './messages';

export const apiRouter = Router();

apiRouter.use(threadsRouter);
apiRouter.use(messagesRouter);
