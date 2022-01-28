import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Store } from './dto/store.dto';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private service: StoreService) {}

  @Post('/create')
  async createStore(@Res() res, @Body() store: Store) {
    const stored = await this.service.createStore(store);
    console.log(stored);

    if (!stored) throw new BadRequestException('Something went wrong');
    return res.status(HttpStatus.OK).json({
      message: 'The store is added succesfully',
      stored,
    });
  }
}
