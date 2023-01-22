import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { MessageModel } from '@/models/messages';
import { ThreadModel } from '@/models/threads';
import { NotFoundError, ValidationError } from '@/models/error';

const getMessages: RequestHandler = async (_, res) => {
  const messages = await MessageModel.findAll({ attributes: { exclude: ['updatedAt'] } });

  res.json({ status: 'ok', data: messages });
};

const getMessageById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const message = await MessageModel.findOne({
    where: { id },
    attributes: { exclude: ['updatedAt'] },
  });

  res.json({ status: 'ok', data: message });
};

const createMessage: RequestHandler = async (req, res) => {
  const { message, nickname } = req.body;
  const threadId = req.body.threadId ? Number(req.body.threadId) : null;

  if (!threadId || Number.isNaN(threadId)) {
    throw new ValidationError('threadId is invalid');
  }

  const existingThread = await ThreadModel.findOne({ where: { id: threadId } });
  if (!existingThread) {
    throw new NotFoundError(`thread with id = ${threadId} not found`);
  }

  const createdMessage = await MessageModel.create({
    message,
    nickname,
    threadId,
  });

  res.status(StatusCodes.CREATED);
  res.json({ status: 'ok', data: createdMessage });
};

const updateMessage: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { message, nickname } = req.body;
  const threadId = req.body.threadId ? Number(req.body.threadId) : undefined;

  if (threadId && Number.isNaN(threadId)) {
    throw new ValidationError('threadId is invalid');
  }

  const existingThread = await ThreadModel.findOne({ where: { id: threadId } });
  if (!existingThread) {
    throw new NotFoundError(`thread with id = ${threadId} not found`);
  }

  const existingMessage = await MessageModel.findOne({ where: { id } });
  if (!existingMessage) {
    throw new NotFoundError(`message with id = ${id} not found`);
  }

  await MessageModel.update(
    { message, nickname, threadId },
    { where: { id: existingMessage.id } },
  );

  res.json({ status: 'ok' });
};

const deleteMessage: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const existingMessage = await MessageModel.findOne({ where: { id } });
  if (!existingMessage) {
    throw new NotFoundError(`message with id = ${id} not found`);
  }

  await MessageModel.destroy({ where: { id: existingMessage.id } });

  res.json({ status: 'ok' });
};

export const messagesController = {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};
