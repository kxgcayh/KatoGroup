import { model, Schema, Document, PopulatedDoc } from 'mongoose';
import { IStoreDB } from './store.model';
import { IUserDB } from './user.model';

// Interface for category database object
export interface ICategoryDB extends Document {
  title: string;
  description: string;
  author: PopulatedDoc<IUserDB & Document>;
  store: PopulatedDoc<IStoreDB & Document>;
  products: PopulatedDoc<IStoreDB & Document>;
  createdAt?: Date;
  updatedAt?: Date;
}

// Category database schema
const CategorySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: 'store',
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const CategoryModel = model<ICategoryDB>('category', CategorySchema);

export default CategoryModel;
