import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { from, Observable } from 'rxjs';
const bycrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private userService: UsuarioService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      const compare = this.comparePasswords(password, user.password);
      if (compare) {
        return user;
      } else {
        throw new UnauthorizedException();
      }
    }
  }
  hashPassword(password: string): Observable<string> {
    return from<string>(bycrypt.hash(password, 12));
  }

  comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Observable<any> {
    return from(bycrypt.compare(password, storedPasswordHash));
  }
}
