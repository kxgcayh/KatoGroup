import { Price, PriceCreateInput } from './price.type';
import { User } from './user.type';

export type Product = {
  name: string;
  description: string;
  available: boolean;
  price: Price;
  author: User;
  id: string;
};

export type ProductCreateInput = {
  name: string;
  description: string;
  available: boolean;
  price: PriceCreateInput;
  author: string;
};

export type ProductUpdateInput = {
  name?: string;
  description?: string;
  available?: boolean;
  price?: PriceCreateInput;
};
