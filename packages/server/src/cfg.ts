import mergeOptions from 'merge-options';
import { defaultConfig } from '@/configs/default';
import { developmentConfig } from '@/configs/development';
import { productionConfig } from '@/configs/production';
import type { AppConfig, Config } from '@/types';

const ENV = process.env.NODE_ENV;

let config: AppConfig = {};

if (ENV === 'development') {
  config = developmentConfig;
}

if (ENV === 'production') {
  config = productionConfig;
}

export const cfg: Config = mergeOptions({ environment: ENV }, defaultConfig, config);
