import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);
    if (user) {
      const response = this.comparePassword(password, user.password);
      if (response) {
      }
    }
  }
  private hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }
  private comparePassword(password: string, storePassword: string) {
    return bcrypt.compare(password, storePassword);
  }
}
