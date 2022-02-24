import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Request,
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

  @UseGuards(AuthenticatedGuard)
  @Post('/create')
  async createStore(@Res() res, @Body() store: Store, @Request() req) {
    const user = req.user;
    const stored = await this.service.createStore(store, user['_doc']._id);
    console.log(stored);

    if (!stored) throw new BadRequestException('Something went wrong');
    return res.status(HttpStatus.OK).json({
      message: 'The store was added succesfully',
      stored,
    });
  }

  @UseGuards(AuthenticatedGuard)
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
  @UseGuards(AuthenticatedGuard)
  @Delete('/deleteAll')
  async deleteAll() {
    await this.service.deleteAll();
  }
}
