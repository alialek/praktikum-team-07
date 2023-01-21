import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ThreadModel } from '@/models/threads';
import { MessageModel } from '@/models/messages';
import { NotFoundError } from '@/models/error';

const getThreads: RequestHandler = async (_, res) => {
  const threads = await ThreadModel.findAll({
    attributes: { exclude: ['updatedAt'] },
    include: { model: MessageModel, attributes: { exclude: ['updatedAt'] } },
  });

  res.json({ status: 'ok', data: threads });
};

const getThreadById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const thread = await ThreadModel.findOne({
    where: { id },
    attributes: { exclude: ['updatedAt'] },
    include: { model: MessageModel },
  });

  res.json({ status: 'ok', data: thread });
};

const createThread: RequestHandler = async (req, res) => {
  const { name, description } = req.body;

  const createdThread = await ThreadModel.create({
    name,
    description,
  });

  res.status(StatusCodes.CREATED);
  res.json({ status: 'ok', data: createdThread });
};

const updateThread: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const existingThread = await ThreadModel.findOne({ where: { id } });
  if (!existingThread) {
    throw new NotFoundError(`thread with id = ${id} not found`);
  }

  await ThreadModel.update({ name, description }, { where: { id: existingThread.id } });

  res.json({ status: 'ok' });
};

const deleteThread: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const existingThread = await ThreadModel.findOne({ where: { id } });
  if (!existingThread) {
    throw new NotFoundError(`thread with id = ${id} not found`);
  }

  await ThreadModel.destroy({ where: { id: existingThread.id } });

  res.json({ status: 'ok' });
};

export const threadsController = {
  getThreads,
  getThreadById,
  createThread,
  updateThread,
  deleteThread,
};
