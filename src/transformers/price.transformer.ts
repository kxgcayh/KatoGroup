import { IPriceDB } from '../models/price.model';
import { Price } from '../types/price.type';

export const transform = (price: IPriceDB): Price => {
  return {
    id: price._id.toString(),
    value: price.value,
    discount: price.discount,
  };
};
