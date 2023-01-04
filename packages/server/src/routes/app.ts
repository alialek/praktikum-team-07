import type {
  ErrorRequestHandler,
  RequestHandler,
  Router,
  Request,
  Response,
} from 'express';
import path from 'path';
import fs from 'fs';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from 'client/dist/ssr/entry-server.cjs';
import { csp } from '@/middlewares/csp';
import { helmet } from '@/middlewares/helmet';
import { cfg } from '@/cfg';

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

export function appRoutes(router: Router) {
  router.get(paths, middlewares, (req: Request, res: Response) => {
    const result = render(req);
    const newString = htmlString.replace('<!--ssr-outlet-->', result);
    res.send(newString);
  });
}
