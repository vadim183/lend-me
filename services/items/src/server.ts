import 'reflect-metadata';

import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { ItemsTypeDefs } from './items.typeDefs';
import { ItemsResolveres } from './items.resolvers';
import { itemsContext } from './items.context';

const server = new ApolloServer({
  typeDefs: ItemsTypeDefs,
  resolvers: ItemsResolveres,
  context: itemsContext
});

var app = express();

server.applyMiddleware({
  app
});

const ITEMS_SERVICE_PORT = 4001;

app.listen(ITEMS_SERVICE_PORT, () => {
  console.info(
    `Items Service is running at http://localhost:${ITEMS_SERVICE_PORT}${
      server.graphqlPath
    }`
  );
});
