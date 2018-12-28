import Application from 'koa';

export const logRequest = async (
  ctx: Application.Context,
  next: () => Promise<any>
) => {
  let start = Date.now();

  await next();

  let responseTime = Date.now() - start;

  console.info(
    `[${start}] From: ${ctx.method}:${
      ctx.url
    }. Response took ${responseTime} ms`
  );
};
