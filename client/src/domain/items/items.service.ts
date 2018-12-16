import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Item, ItemsQueryInput } from '../../../../contracts/items';
import { GraphqlClient } from '@core/graphql';
import { ItemViewModel } from './items.models';

interface GetItemsResponse {
  items: Item[];
}

interface GetItemsVariables {
  input: ItemsQueryInput;
}

@injectable()
export class ItemsService {
  constructor(private readonly graphqlClient: GraphqlClient) {}

  public getItems(input: ItemsQueryInput): Observable<ItemViewModel[]> {
    return this.graphqlClient
      .query<GetItemsResponse, GetItemsVariables>(
        `query Items($input: ItemsQueryInput!){
          items(input: $input) {
           id
           description
           thumbnailUrl
         }
       }`,
        { input }
      )
      .pipe(
        map((response: GetItemsResponse) =>
          response.items.map(item => {
            return {
              id: item.id,
              description: item.description,
              thumbnailUrl: item.thumbnailUrl
            };
          })
        )
      );
  }
}
