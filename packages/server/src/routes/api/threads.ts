import { Router } from 'express';

import { threadsController } from '@/controllers/api/threads';

export const threadsRouter = Router();

threadsRouter.get('/threads', threadsController.getThreads);
threadsRouter.get('/threads/:id', threadsController.getThreadById);
threadsRouter.post('/threads', threadsController.createThread);
threadsRouter.patch('/threads/:id', threadsController.updateThread);
threadsRouter.delete('/threads/:id', threadsController.deleteThread);
