import { Router } from 'express';

import { messagesController } from '@/controllers/api/messages';

export const messagesRouter = Router();

messagesRouter.get('/messages', messagesController.getMessages);
messagesRouter.get('/messages/:id', messagesController.getMessageById);
messagesRouter.post('/messages', messagesController.createMessage);
messagesRouter.patch('/messages/:id', messagesController.updateMessage);
messagesRouter.delete('/messages/:id', messagesController.deleteMessage);
