import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';

import { cors } from '@/middlewares/cors';
import { logger } from '@/middlewares/logger';
import { cfg } from '@/cfg';
import { appRouter } from '@/routes';
import { dbConnect } from '@/db';
import { errorHandler, notFoundErrorHandler } from '@/middlewares/error';

dotenv.config();

dbConnect();

const app = express();

app.use(cors);
app.use(logger);
app.use(express.static(cfg.static.staticDir));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(appRouter);
app.use(errorHandler);
app.use('*', notFoundErrorHandler);

app.listen(cfg.server.port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${cfg.server.port}`);
});
