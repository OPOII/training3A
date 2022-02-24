import { AuthenticatedGuard } from './../auth/authenticated.guard';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { User } from './dto/user.dto';
import { UserService } from './user.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  //@UseGuards(AuthenticatedGuard)
  @Post('createUser')
  async createUser(@Res() res, @Body() bodyUser: User) {
    const user = await this.service.createUser(bodyUser);

    if (!user) throw new BadRequestException('Something went wrong');
    return res.status(HttpStatus.OK).json({
      message: 'The store is added succesfully',
      user,
    });
  }
}
