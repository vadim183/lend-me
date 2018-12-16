import { gql } from 'apollo-server-express';

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
