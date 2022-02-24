import { ApiProperty } from '@nestjs/swagger';

export class UpdateProduct {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  imageURL?: string;
}
