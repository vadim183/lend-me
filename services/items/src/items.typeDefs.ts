import { gql } from 'apollo-server-koa';

export const itemsTypeDefs = gql`
  type Item {
    id: Int!
    description: String!
    thumbnailUrl: String!
  }

  input ItemsQueryInput {
    fromIndex: Int!
    toIndex: Int!
  }

  type Query {
    items(input: ItemsQueryInput!): [Item]
  }
`;
