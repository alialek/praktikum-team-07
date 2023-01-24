import { Client } from 'pg';

import { Sequelize } from 'sequelize-typescript';
import { MessageModel } from './models/messages';
import { ThreadModel } from './models/threads';
import { ForumModel } from './models/forums';
import { cfg } from './cfg';

const { host, port, user, password, database } = cfg.database;

export const createClientAndConnect = async (): Promise<Client | null> => {
  try {
    const client = new Client({
      user,
      host,
      database,
      password,
      port,
    });

    await client.connect();

    const res = await client.query('SELECT NOW()');
    console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now);
    client.end();

    return client;
  } catch (e) {
    console.error(e);
  }

  return null;
};

// Инстанс Sequelize
export const sequelize = new Sequelize({
  host,
  port,
  username: user,
  password,
  database,
  dialect: 'postgres',
  models: [MessageModel, ThreadModel, ForumModel],
});

// Подключение к БД
export const dbConnect = async () => {
  try {
    await sequelize.authenticate(); // Проверка коннекта к бд
    await sequelize.sync(); // Синхронизация БД

    console.log('Sequelize connecnted');
  } catch (error) {
    console.error('Sequelize unable to connect:', error);
  }
};
