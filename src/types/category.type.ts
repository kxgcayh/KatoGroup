import { Product } from './product.type';
import { Store } from './store.type';
import { User } from './user.type';

export type Category = {
  title: string;
  description: string;
  author: User;
  store: Store;
  products: Product[];
  id: string;
};

export type CategoryCreateInput = {
  title: string;
  description: string;
  author: string;
  store: string;
};

export type CategoryUpdateInput = {
  title?: string;
  description?: string;
};
