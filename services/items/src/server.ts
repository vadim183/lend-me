import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-koa';
import Koa = require('koa');

import { ITEMS_SERVICE_PORT } from '@lend-me/api';

import { ItemsTypeDefs } from './items.typeDefs';
import { ItemsResolvers } from './items.resolvers';
import { itemsContext } from './items.context';
import { dbProvider } from './items.composition-root';
import { routes } from './routes';
import { logRequest } from './middleware';

const startServer = async () => {
  await dbProvider.provideConnection();

  const server = new ApolloServer({
    typeDefs: ItemsTypeDefs,
    resolvers: ItemsResolvers,
    context: itemsContext
  });

  const app = new Koa();

  server.applyMiddleware({
    app
  });

  app
    .use(logRequest)
    .use(routes)
    .listen(ITEMS_SERVICE_PORT, () => {
      console.info(
        `Items Service is running at http://localhost:${ITEMS_SERVICE_PORT}${
          server.graphqlPath
        }.`
      );
    });
};

startServer();
