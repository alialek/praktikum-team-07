import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import express from 'express';

// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from 'client/dist/ssr/entry-server.cjs';

dotenv.config();

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;

app.get('/', (req, res) => {
  const result = render(req);
  const template = path.resolve(__dirname, '../client/dist/index.html');
  const htmlString = fs.readFileSync(template, 'utf-8');
  const newString = htmlString.replace('<!--ssr-outlet-->', result);
  res.send(newString);
});

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
