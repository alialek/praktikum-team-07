import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import { App } from '@/components/App/App';

export const render = (req: Request) =>
  renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
  );
