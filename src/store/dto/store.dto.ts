import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { CreateProductDTO } from '../../products/dto/products.dto';

export type StoreDocument = Store & Document;

@Schema()
export class Store {
  @ApiProperty()
  @Prop()
  name: string;
  @Prop()
  @ApiProperty()
  direction: string;
  @Prop()
  @ApiProperty()
  owner: string;
  @Prop()
  @ApiProperty()
  createdAt: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CreateProductDTO' }],
  })
  product: CreateProductDTO[];
}
export const StoreSchema = SchemaFactory.createForClass(Store);
