import { Book } from './book.model';

export class Cart {
  items:      Book[] = [];
  totalPrice: number;
}