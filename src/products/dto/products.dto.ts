import { Store } from './../../store/dto/store.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
export type CreateProductDTODocument = CreateProductDTO & Document;

@Schema()
export class CreateProductDTO {
  @ApiProperty()
  @Prop()
  name: string;
  @Prop()
  @ApiProperty()
  description: string;
  @Prop()
  @ApiProperty()
  imageURL: string;
  @Prop()
  @ApiProperty()
  price: number;

  @Prop()
  owner: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true })
  store: Types.ObjectId;
}

export const CreateProductDTOSchema =
  SchemaFactory.createForClass(CreateProductDTO);
