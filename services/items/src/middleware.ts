import { ApplicationContext } from './application-context';

export const logRequest = async (
  ctx: ApplicationContext,
  next: () => Promise<any>
) => {
  let start = Date.now();

  await next();

  let responseTime = Date.now() - start;

  ctx.logger.info(
    `From: ${ctx.method}:${ctx.url}. Response took ${responseTime} ms`
  );
};
