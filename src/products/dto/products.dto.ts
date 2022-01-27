import { Schema } from '@nestjs/mongoose';

@Schema()
export class CreateProductDTO {
  readonly name: string;
  readonly description: string;
  readonly imageURL: string;
  readonly price: number;
}
