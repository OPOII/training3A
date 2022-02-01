import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);
    if (user) {
      const response = this.userService.validatePassForService(
        password,
        user.password,
      );
      if (response) {
        const { password, username, ...rest } = user;
        return rest;
      }
      return null;
    }
  }
}
