import { Router } from 'express';
import { forumsRouter } from './forums';
import { threadsRouter } from './threads';
import { messagesRouter } from './messages';

export const apiRouter = Router();

apiRouter.use(forumsRouter);
apiRouter.use(threadsRouter);
apiRouter.use(messagesRouter);
