import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  idUser: string;

  /* @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true })
  product: Types.ObjectId;
  */
}

export const UserSchema = SchemaFactory.createForClass(User);
