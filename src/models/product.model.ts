import { model, Schema, Document, PopulatedDoc } from 'mongoose';
import { IPriceDB, PriceSchema } from './price.model';
import { IUserDB } from './user.model';
export interface IProductDB extends Document {
  name: string;
  description: string;
  available: boolean;
  price: IPriceDB;
  author: PopulatedDoc<IUserDB & Document>;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    price: PriceSchema,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true, versionKey: false }
);
export const ProductModel = model<IProductDB>('product', ProductSchema);
