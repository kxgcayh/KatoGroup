import { User } from './user.type';

export type Store = {
  name: string;
  description: string;
  author: User;
  id: string;
};

export type StoreCreateInput = {
  name: string;
  description: string;
  author: User;
};

export type StoreUpdateInput = {
  name: string;
  description: string;
};
