import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
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

  @Get('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The id that is representated in the database',
  })
  async getStoresWithPopulate(@Param('id') id) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/')
  async getStores(@Res() res) {
    const stores = await this.service.getStores();
    return res.status(HttpStatus.OK).json({
      stores,
    });
  }
  @Delete('/deleteAll')
  async deleteAll() {
    await this.service.deleteAll();
  }
}
