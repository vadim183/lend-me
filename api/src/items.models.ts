export interface Item {
  id: number;
  description: string;
  thumbnailUrl: string;
}

export interface ItemsQueryInput {
  fromIndex: number;
  toIndex: number;
}
