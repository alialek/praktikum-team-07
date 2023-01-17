import { Client } from 'pg';

import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { MessageModel } from './models/messages';
import { ThreadModel } from './models/threads';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

export const createClientAndConnect = async (): Promise<Client | null> => {
  try {
    const client = new Client({
      user: POSTGRES_USER,
      host: 'localhost',
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
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

export const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
};

// Инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions);

// Инициализация моделей
export const Thread = sequelize.define('Thread', ThreadModel);
export const Message = sequelize.define('Message', MessageModel);

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
