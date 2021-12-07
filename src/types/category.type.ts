import { User } from './user.type';

export type Category = {
  title: string;
  description: string;
  author: User;
  id: string;
};

export type CategoryCreateInput = {
  title: string;
  description: string;
  author: string;
};

export type CategoryUpdateInput = {
  title?: string;
  description?: string;
};

export type Pagination = {
  size: number;
  page: number;
};
