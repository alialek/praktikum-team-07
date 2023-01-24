import { Router } from 'express';

import { forumsController } from '@/controllers/api/forums';

export const forumsRouter = Router();

forumsRouter.get('/forums', forumsController.getForums);
forumsRouter.get('/forums/:id', forumsController.getForumById);
forumsRouter.post('/forums', forumsController.createForum);
forumsRouter.patch('/forums/:id', forumsController.updateForum);
forumsRouter.delete('/forums/:id', forumsController.deleteForum);
