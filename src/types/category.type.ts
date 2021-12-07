import { Store } from './store.type';
import { User } from './user.type';

export type Category = {
  title: string;
  description: string;
  author: User;
  store: Store;
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
