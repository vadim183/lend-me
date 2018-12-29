import { Image } from './image';

export interface ItemDetails {
  id: number;
  userId: number;
  description: string;
  images: Image[];
}
