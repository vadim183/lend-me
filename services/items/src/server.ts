import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-koa';
import Koa = require('koa');
import Router = require('koa-router');

import { ITEMS_SERVICE_PORT } from '@lend-me/api';

import { ItemsTypeDefs } from './items.typeDefs';
import { ItemsResolvers } from './items.resolvers';
import { itemsContext } from './items.context';
import { dbProvider } from './items.composition-root';

dbProvider.provideConnection();

const server = new ApolloServer({
  typeDefs: ItemsTypeDefs,
  resolvers: ItemsResolvers,
  context: itemsContext
});

const app = new Koa();

const router = new Router();
router.get('/health', (ctx, next) => {
  ctx.body = 'Items service works!';
});

server.applyMiddleware({
  app
});

app.use(router.routes()).listen(ITEMS_SERVICE_PORT, () => {
  console.info(
    `Items Service is running at http://localhost:${ITEMS_SERVICE_PORT}${
      server.graphqlPath
    }.`
  );
});
