import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop()
  name: string;
  @ApiProperty()
  @Prop()
  username: string;
  @ApiProperty()
  @Prop()
  password: string;
  //ID of the owner
  owner?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
