import { number } from 'joi';
import { model, Schema, Document, PopulatedDoc } from 'mongoose';
import { IUserDB } from './user.model';

// ? === PRICE ===
export interface IPriceDB extends Document {
  price: number;
  discount?: number;
}
const PriceSchema: Schema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
});
export const PriceModel = model<IPriceDB>('price', PriceSchema);

// ? === LIKE ===
export interface ILikeDB extends Document {
  count: number;
  likedBy?: Array<PopulatedDoc<IUserDB & Document>>;
}
const LikeSchema: Schema = new Schema({
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  likedBy: [
    {
      ref: 'user',
      type: Schema.Types.ObjectId,
      required: true,
    },
  ],
});

// ? === PRODUCT ===
export interface IProductDB extends Document {
  name: string;
  description: string;
  available: boolean;
  price: PopulatedDoc<IPriceDB & Document>;
  likes: PopulatedDoc<ILikeDB & Document>;
  author: PopulatedDoc<IUserDB & Document>;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema = new Schema({
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
  price: {
    type: Schema.Types.ObjectId,
    ref: 'price',
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'likes',
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});
export const ProductModel = model<IProductDB>('product', ProductSchema);
