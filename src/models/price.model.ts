import { Schema, Document } from 'mongoose';

export interface IPriceDB extends Document {
  value: number;
  discount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const PriceSchema: Schema = new Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
  },
  { versionKey: false }
);
