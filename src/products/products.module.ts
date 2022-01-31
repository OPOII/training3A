import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDTO, CreateProductDTOSchema } from './dto/products.dto';
import { Store, StoreSchema } from '../store/dto/store.dto';
import { User, UserSchema } from 'src/usuario/dto/usuario.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CreateProductDTO.name, schema: CreateProductDTOSchema },
      { name: Store.name, schema: StoreSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
