import Application from 'koa';
import { Logger } from './core/logger';

export interface ApplicationContext extends Application.Context {
  logger: Logger;
}
