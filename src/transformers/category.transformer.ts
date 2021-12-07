import { ICategoryDB } from '../models/category.model';
import { Category } from '../types/category.type';
import { transform as transformUser } from './user.transformer';

const transform = (category: ICategoryDB): Category => {
  return {
    id: category._id.toString(),
    description: category.description,
    title: category.title,
    author: transformUser(category.author),
  };
};

export default transform;
