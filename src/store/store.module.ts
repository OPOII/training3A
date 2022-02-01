import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Store, StoreSchema } from './dto/store.dto';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
