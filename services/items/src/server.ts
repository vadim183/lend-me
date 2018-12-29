import 'reflect-metadata';

import {
  ApolloServer,
  mergeSchemas,
  makeExecutableSchema
} from 'apollo-server-koa';
import Koa = require('koa');

import { ITEMS_SERVICE_PORT } from '@lend-me/api';

import { itemsTypeDefs } from './items.typeDefs';
import { itemsResolvers } from './items.resolvers';
import { enginesContext } from './items.context';
import { dbProvider, logger } from './items.composition-root';
import { routes } from './routes';
import { logRequest } from './middleware';

const startServer = async () => {
  await dbProvider.provideConnection();

  const schema = mergeSchemas({
    schemas: [makeExecutableSchema({ typeDefs: itemsTypeDefs })],
    resolvers: itemsResolvers
  });

  const server = new ApolloServer({
    schema,
    context: enginesContext
  });

  const app = new Koa();

  server.applyMiddleware({
    app
  });

  app.context.logger = logger;

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
