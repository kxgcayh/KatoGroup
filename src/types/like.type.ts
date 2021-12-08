import { User } from './user.type';

export type Like = {
  likedBy: User;
  id: string;
};

export type LikeCreateInput = {
  likedBy: User;
};
