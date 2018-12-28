import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import express = require('express');

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

var app = express();

server.applyMiddleware({
  app
});

app.listen(ITEMS_SERVICE_PORT, () => {
  console.info(
    `Items Service is running at http://localhost:${ITEMS_SERVICE_PORT}${
      server.graphqlPath
    }.`
  );
});
