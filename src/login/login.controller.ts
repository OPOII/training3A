import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Request,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Login } from 'src/user/dto/login.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('login')
export class LoginController {
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req, @Res() res: Response, @Body() log: Login) {
    return res.status(HttpStatus.ACCEPTED).json({
      error: false,
      msg: req.user['_doc'].name,
    });
    //return req.user['_doc'].name;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('prueba')
  async getHello(@Request() req) {
    const user = req.user;

    return 'el usuario ' + user['_doc'].name + ' esta loggeado';
  }
}
