import type { HelmetOptions } from 'helmet';
import type { CorsOptions } from 'cors';

export interface Config {
  environment: string;

  csp?: Record<string, unknown>;

  helmet?: Readonly<HelmetOptions>;

  cors?: CorsOptions & {
    allowedOrigins?: Array<string | RegExp>;
  };

  static: {
    baseUrl: string;
    staticDir: string;
  };

  logger: {
    format: 'combined' | 'common' | 'dev' | 'short' | 'tiny';
  };

  server: {
    port: number;
  };
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

// export type AppConfig = Config;
export type AppConfig = RecursivePartial<Config>;
