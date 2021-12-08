import { Schema, Document } from 'mongoose';
import { IUserDB, UserSchema } from './user.model';

export interface ILikeDb extends Document {
  likedBy: IUserDB;
  createdAt?: Date;
  updatedAt?: Date;
}

export const PriceSchema: Schema = new Schema(
  {
    likedBy: UserSchema,
  },
  { versionKey: false }
);
