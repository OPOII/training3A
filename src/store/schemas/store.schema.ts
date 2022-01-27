import { Schema } from 'mongoose';

export const StoreSchema = new Schema({
  name: { type: String, required: true },
  direction: String,
  owner: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
