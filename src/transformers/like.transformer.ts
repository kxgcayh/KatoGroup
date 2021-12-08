// import { IPriceDB } from '../models/price.model';
// import { Price } from '../types/price.type';
import { ILikeDb } from '../models/like.model';
import { Like } from '../types/like.type';
import { transformUsers, transform as transformUser } from './user.transformer';

export const transform = (like: ILikeDb): Like => {
  return {
    id: like._id.toString(),
    likedBy: transformUser(like.likedBy),
  };
};
