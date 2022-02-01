import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('login')
  async login() {
    return {};
  }
}
