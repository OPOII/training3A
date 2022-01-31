import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { User, UserDocument } from './dto/usuario.dto';
import { LoginUser } from './dto/loginuser.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  async findUser(user: string): Promise<UserDocument> {
    const result = await this.userModel.findOne({ username: user });
    return result;
  }

  async saveUser(user: User): Promise<Observable<UserDocument>> {
    const searchUser = this.findUser(user.username);
    if (searchUser) {
      throw new ConflictException(
        'The user with the email: ' + user.username + ' already exist',
      );
    } else {
      return this.authService.hashPassword(user.password).pipe(
        switchMap(async (passwordHash: string) => {
          user.password = passwordHash;
          const response = new this.userModel(user);
          return await response.save();
        }),
      );
    }
  }
  async login(logs: LoginUser): Promise<any> {
    const searchedUser = this.findUser(logs.username);
    if (searchedUser) {
      const validation = this.validatePassword(
        logs.username,
        (await searchedUser).password,
      );
      if (validation) {
        return true;
      } else {
        throw new HttpException(
          'Login was not succesfull',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }
  private async validatePassword(
    password: string,
    storedPassword: string,
  ): Promise<Observable<boolean>> {
    return this.authService.comparePasswords(password, storedPassword);
  }
}
