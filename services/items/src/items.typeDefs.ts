import { gql } from 'apollo-server-koa';

export const ItemsTypeDefs = gql`
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
