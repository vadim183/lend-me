import { injectable } from 'inversify';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { from, Observable } from 'rxjs';

const ITEMS_SERVICE_PORT = 4001;

const httpLink = createHttpLink({
  uri: `http://localhost:${ITEMS_SERVICE_PORT}/graphql`
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

@injectable()
export class GraphqlClient {
  public query<TResult, TVaribales = {}>(
    query: string,
    variables: TVaribales
  ): Observable<TResult> {
    return from(
      client
        .query({
          query: gql`
            ${query}
          `,
          variables
        })
        .then(response => {
          return response.data as TResult;
        })
        .catch(reason => {
          throw new Error(reason);
        })
    );
  }
}
