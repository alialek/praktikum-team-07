import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ForumModel } from '@/models/forums';
import { NotFoundError } from '@/models/error';
import { ThreadModel } from '@/models/threads';
import { MessageModel } from '@/models/messages';

const getForums: RequestHandler = async (_, res) => {
  const forums = await ForumModel.findAll({
    attributes: {
      exclude: ['updatedAt'],
    },
    include: [
      {
        model: ThreadModel,
        include: [{ model: MessageModel, attributes: ['id'] }],
        attributes: ['id'],
      },
    ],
    order: [['id', 'ASC']],
  });

  res.json(
    forums.map((forum) => ({
      id: forum.id,
      title: forum.title,
      description: forum.description,
      threadCount: forum.threads.length,
      messageCount: forum.threads.reduce(
        (count, thread) => count + thread.messages.length,
        0,
      ),
    })),
  );
};

const getForumById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const forum = await ForumModel.findOne({
    where: { id },
    attributes: { exclude: ['updatedAt'] },
    include: {
      model: ThreadModel,
      include: [{ model: MessageModel, attributes: ['id'] }],
      attributes: {
        exclude: ['updatedAt'],
      },
    },
  });

  if (forum) {
    res.json({
      id: forum.id,
      title: forum.title,
      description: forum.description,
      threads: forum.threads.map((thread) => ({
        id: thread.id,
        name: thread.name,
        description: thread.description,
        messageCount: thread.messages.length,
      })),
    });
  } else {
    res.json(forum);
  }
};

const createForum: RequestHandler = async (req, res) => {
  const { title, description } = req.body;

  const createdForum = await ForumModel.create({
    title,
    description,
  });

  res.status(StatusCodes.CREATED);
  res.json(createdForum);
};

const updateForum: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const existingForum = await ForumModel.findOne({ where: { id } });
  if (!existingForum) {
    throw new NotFoundError(`forum with id = ${id} not found`);
  }

  await ForumModel.update({ title, description }, { where: { id: existingForum.id } });

  res.sendStatus(StatusCodes.OK);
};

const deleteForum: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const existingForum = await ForumModel.findOne({ where: { id } });
  if (!existingForum) {
    throw new NotFoundError(`forum with id = ${id} not found`);
  }

  await ForumModel.destroy({ where: { id: existingForum.id } });

  res.sendStatus(StatusCodes.OK);
};

export const forumsController = {
  getForums,
  getForumById,
  createForum,
  updateForum,
  deleteForum,
};
