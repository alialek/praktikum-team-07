import type { ErrorRequestHandler, RequestHandler, Request, Response } from 'express';
import { Router } from 'express';
import path from 'path';
import fs from 'fs';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from 'client/dist/ssr/entry-server.cjs';
import { csp } from '@/middlewares/csp';
import { helmet } from '@/middlewares/helmet';
import { cfg } from '@/cfg';

export const clientRouter = Router();

const paths = [
  '/',
  '/auth',
  '/auth/login',
  '/auth/register',
  '/profile',
  '/change_password',
  '/forum',
  '/end',
  '/leaders',
];
const middlewares: Array<RequestHandler | ErrorRequestHandler> = [helmet, csp];

const templatePath = path.resolve(cfg.static.staticDir, 'index.html');
const htmlString = fs.readFileSync(templatePath, 'utf-8');

clientRouter.get(paths, middlewares, (req: Request, res: Response) => {
  const result = render(req);
  const newString = htmlString.replace('<!--ssr-outlet-->', result);
  res.send(newString);
});
