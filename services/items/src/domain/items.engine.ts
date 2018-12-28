import { injectable } from 'inversify';
import { forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Item, ItemsQueryInput } from '@lend-me/api';
import { HttpClient } from '../core';
import { ItemSchema } from './item.schma';
import { CollectionProvider } from '../core/mongo/collection-provider';

const API_URL = 'https://jsonplaceholder.typicode.com';

const PHOTOS_API_URL = `${API_URL}/photos`;

interface ItemDTO {
  id: number;
  title: string;
}

interface PhotoDTO {
  thumbnailUrl: string;
}

@injectable()
export class ItemsEngine {
  private itemsCollection: CollectionProvider<ItemDTO>;

  constructor(private readonly httpClient: HttpClient) {
    this.itemsCollection = new CollectionProvider('Item', ItemSchema);
  }

  public getItems(input: ItemsQueryInput): Promise<Item[]> {
    let items$ = this.itemsCollection.getAll();
    let photos$ = this.httpClient.get<PhotoDTO[]>(PHOTOS_API_URL);

    return forkJoin(items$, photos$)
      .pipe(
        map(result => this.mapToItems(result, input)),
        catchError((error: Error) => {
          throw error;
        })
      )
      .toPromise();
  }

  private mapToItems(
    [items, photos]: [ItemDTO[], PhotoDTO[]],
    input: ItemsQueryInput
  ): Item[] {
    let selectedItems = items.slice(input.fromIndex, input.toIndex);

    return selectedItems.map((itemDto, index) => {
      let photoDto = photos[index];

      return {
        id: itemDto.id,
        description: itemDto.title,
        thumbnailUrl: photoDto.thumbnailUrl
      };
    });
  }
}
