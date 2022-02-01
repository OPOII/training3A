import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './dto/user.dto';
const bcrypt = require('bcrypt');
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findUser(user: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username: user });
  }

  async createUser(user: User): Promise<User> {
    const searchUser = await this.findUser(user.username);
    console.log(searchUser);
    if (!searchUser) {
      user.password = await this.hashPassword(user.password);
      console.log(user.password);
      const savedUser = await new this.userModel(user);
      return await savedUser.save();
    } else {
      throw new BadRequestException('Something went wrong');
    }
  }

  async validatePassForService(password: string, storePassword: string) {
    return await this.comparePassword(password, storePassword);
  }

  private comparePassword(password: string, storePassword: string) {
    return bcrypt.compare(password, storePassword);
  }
  private hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }
}
