import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { StoreModule } from './store/store.module';
@Module({
  imports: [
    ProductsModule,
    StoreModule,
    MongooseModule.forRoot('mongodb://localhost/products'),
    MongooseModule.forRoot('mongodb://localhost/store'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
