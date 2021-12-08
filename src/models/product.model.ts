import { model, Schema, Document, PopulatedDoc } from 'mongoose';
import { IUserDB } from './user.model';

export interface IProductDB extends Document {
  name: string;
  description: string;
  // price: PopulatedDoc<IPriceDB & Document>;
  author: PopulatedDoc<IUserDB & Document>;
  createdAt?: Date;
  updatedAt?: Date;
}
