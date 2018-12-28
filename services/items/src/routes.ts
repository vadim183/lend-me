import Router = require('koa-router');

const router = new Router();

router.get('/health', (ctx: Router.IRouterContext) => {
  ctx.body = 'Items service works!';
});

export const routes = router.routes();
