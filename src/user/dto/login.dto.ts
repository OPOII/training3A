import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LoginDocument = Login & Document;

@Schema()
export class Login {
  @ApiProperty()
  @Prop()
  username: string;
  @ApiProperty()
  @Prop()
  password: string;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
