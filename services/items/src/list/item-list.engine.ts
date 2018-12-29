import { injectable, inject } from 'inversify';
import { forkJoin, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Item, ItemsQueryInput, ItemDetails } from '@lend-me/api';

import { HttpClient, Repository } from '../core';
import { ITEMS_REPOSITORY_TOKEN, ItemDTO } from '../domain';

const PHOTOS_API_URL = `https://jsonplaceholder.typicode.com/photos`;

interface PhotoDTO {
  id: number;
  url: string;
  thumbnailUrl: string;
}

@injectable()
export class ItemListEngine {
  constructor(
    private readonly httpClient: HttpClient,
    @inject(ITEMS_REPOSITORY_TOKEN)
    private itemsRepository: Repository<ItemDTO>
  ) {}

  public getItems(input: ItemsQueryInput): Promise<Item[]> {
    let items$ = this.itemsRepository.getAll();
    let photos$ = this.getPhotos();

    return forkJoin(items$, photos$)
      .pipe(
        map(result => this.mapToItems(result, input)),
        catchError((error: Error) => {
          throw error;
        })
      )
      .toPromise();
  }

  public getItemDetails(id: number): Promise<ItemDetails> {
    let item$ = this.itemsRepository.get(id);
    let photos$ = this.getPhotos();

    return forkJoin(item$, photos$)
      .pipe(
        map(result => this.mapToItemDetails(result)),
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

  private mapToItemDetails([itemDto, photos]: [
    ItemDTO,
    PhotoDTO[]
  ]): ItemDetails {
    let selectedPhotos = photos.slice(0, 4);

    return {
      id: itemDto.id,
      description: itemDto.title,
      userId: itemDto.userId,
      images: selectedPhotos.map(photoDto => {
        return {
          url: photoDto.url,
          thumbnailUrl: photoDto.thumbnailUrl
        };
      })
    };
  }

  private getPhotos(): Observable<PhotoDTO[]> {
    return this.httpClient.get<PhotoDTO[]>(PHOTOS_API_URL);
  }
}
