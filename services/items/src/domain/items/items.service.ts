import { injectable } from 'inversify';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Item, ItemsQueryInput } from '../../../../../contracts/items';
import { HttpClient } from '../../core/http/index';

const API_URL = 'https://jsonplaceholder.typicode.com';

const ITEMS_API_URL = `${API_URL}/todos`;

const PHOTOS_API_URL = `${API_URL}/photos`;

interface ItemDTO {
  id: number;
  title: string;
}

interface PhotoDTO {
  thumbnailUrl: string;
}

@injectable()
export class ItemsService {
  constructor(private readonly httpClient: HttpClient) {}

  public getItems(input: ItemsQueryInput): Promise<Item[]> {
    let items$ = this.httpClient.get<ItemDTO[]>(ITEMS_API_URL);
    let photos$ = this.httpClient.get<PhotoDTO[]>(PHOTOS_API_URL);

    return forkJoin(items$, photos$)
      .pipe(map(result => this.mapToItems(result, input)))
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
