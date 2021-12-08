import { model, Schema, Document, PopulatedDoc } from 'mongoose';
import { IUserDB } from './user.model';

export interface IStoreDB extends Document {
  name: string;
  description: string;
  author: PopulatedDoc<IUserDB & Document>;
  createdAt?: Date;
  updatedAt?: Date;
}

const StoreSchema: Schema = new Schema(
  {
    name: {
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
  },
  { timestamps: true, versionKey: false }
);

StoreSchema.virtual('categories', {
  ref: 'category',
  localField: '_id',
  foreignField: 'store',
});

const StoreModel = model<IStoreDB>('store', StoreSchema);

export default StoreModel;
