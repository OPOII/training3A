import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { StoreModule } from './store/store.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    AuthModule,
    ProductsModule,
    StoreModule,
    UsuarioModule,
    MongooseModule.forRoot('mongodb://localhost/products'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
