import { IProductDB } from '../models/product.model';
import { Product } from '../types/product.type';
import { transform as transformPrice } from './price.transformer';
import { transform as transformUser } from './user.transformer';

export const transform = (product: IProductDB): Product => {
  return {
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    available: product.available,
    price: transformPrice(product.price),
    author: transformUser(product.author),
  };
};

export const transformProducts = (product: IProductDB): Product[] => {
  return [
    {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      available: product.available,
      price: transformPrice(product.price),
      author: transformUser(product.author),
    },
  ];
};
