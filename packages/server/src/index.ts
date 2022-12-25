import dotenv from 'dotenv';
import express from 'express';
import { cors } from '@/middlewares/cors';
import { logger } from '@/middlewares/logger';
import { cfg } from '@/cfg';
import router from '@/routes';

dotenv.config();

const app = express();

app.use(cors);
app.use(logger);
app.use(express.static(cfg.static.staticDir));

app.use(router);

app.listen(cfg.server.port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${cfg.server.port}`);
});
