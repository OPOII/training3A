import { Document } from 'mongoose';
export interface Store extends Document {
  readonly name: string;
  readonly direction: string;
  readonly owner: string;
  readonly createdAt: Date;
}
