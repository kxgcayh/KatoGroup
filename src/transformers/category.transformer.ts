import { ICategoryDB } from '../models/category.model';
import { Category } from '../types/category.type';
import { transform as transformUser } from './user.transformer';
import { transform as transformStore } from './store.transformer';

export const transform = (category: ICategoryDB): Category => {
  return {
    id: category._id.toString(),
    description: category.description,
    title: category.title,
    store: transformStore(category.store),
    author: transformUser(category.author),
  };
};
