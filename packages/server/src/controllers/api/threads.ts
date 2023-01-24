import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ThreadModel } from '@/models/threads';
import { MessageModel } from '@/models/messages';
import { NotFoundError, ValidationError } from '@/models/error';
import { ForumModel } from '@/models/forums';

const getThreads: RequestHandler = async (_, res) => {
  const threads = await ThreadModel.findAll({
    attributes: { exclude: ['updatedAt'] },
    include: { model: MessageModel, attributes: { exclude: ['updatedAt'] } },
    order: [['id', 'ASC']],
  });

  res.json(threads);
};

const getThreadById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const thread = await ThreadModel.findOne({
    where: { id },
    attributes: { exclude: ['updatedAt'] },
    include: { model: MessageModel, attributes: { exclude: ['threadId', 'updatedAt'] } },
  });

  if (thread) {
    res.json({
      id: thread.id,
      name: thread.name,
      description: thread.description,
      messageCount: thread.messages.length,
      messages: thread.messages,
    });
  } else {
    res.json(thread);
  }
};

const createThread: RequestHandler = async (req, res) => {
  const { name, description } = req.body;
  const forumId = req.body.forumId ? Number(req.body.forumId) : null;

  if (!forumId) {
    throw new ValidationError('forumId is required');
  }

  if (forumId && Number.isNaN(forumId)) {
    throw new ValidationError('forumId is invalid');
  }

  const existingForum = await ForumModel.findOne({ where: { id: forumId } });
  if (!existingForum) {
    throw new NotFoundError(`forum with id = ${forumId} not found`);
  }

  const createdThread = await ThreadModel.create({
    name,
    description,
    forumId,
  });

  res.status(StatusCodes.CREATED);
  res.json(createdThread);
};

const updateThread: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const forumId = req.body.forumId ? Number(req.body.forumId) : undefined;

  if (forumId && Number.isNaN(forumId)) {
    throw new ValidationError('forumId is invalid');
  }

  const existingForum = await ForumModel.findOne({ where: { id: forumId } });
  if (!existingForum) {
    throw new NotFoundError(`thread with id = ${forumId} not found`);
  }

  const existingThread = await ThreadModel.findOne({ where: { id } });
  if (!existingThread) {
    throw new NotFoundError(`thread with id = ${id} not found`);
  }

  await ThreadModel.update({ name, description }, { where: { id: existingThread.id } });

  res.sendStatus(StatusCodes.OK);
};

const deleteThread: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const existingThread = await ThreadModel.findOne({ where: { id } });
  if (!existingThread) {
    throw new NotFoundError(`thread with id = ${id} not found`);
  }

  await ThreadModel.destroy({ where: { id: existingThread.id } });

  res.sendStatus(StatusCodes.OK);
};

export const threadsController = {
  getThreads,
  getThreadById,
  createThread,
  updateThread,
  deleteThread,
};
