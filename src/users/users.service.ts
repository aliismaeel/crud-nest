import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  findAllUsers = async () => {
    const users = await this.userModel.find();
    if (users.length === 0) {
      throw new HttpException('users does not exist', HttpStatus.NOT_FOUND);
    }
    return users;
  };

  createUser = async (data: any) => {
    const user = new this.userModel(data);
    await user.save();
  };

  findUser = async (id: string) => {
    const user = await this.userModel.findById({ _id: id });
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    return user;
  };

  updateUser = async (id: string, updatedData: any) => {
    const user = await this.userModel.findById({ _id: id });
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    if (updatedData.firstName) {
      user.firstName = updatedData.firstName;
    }
    if (updatedData.lastName) {
      user.lastName = updatedData.lastName;
    }
    if (updatedData.email) {
      user.email = updatedData.email;
    }
    if (updatedData.password) {
      user.password = updatedData.password;
    }
    return await user.save();
  };

  deleteUser = async (id: string) => {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    return user;
  };

  signIn = async (loggingData: any) => {
    const user = await this.userModel.findOne({
      password: loggingData.password,
      email: loggingData.email,
    });
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    return user;
  };
}
