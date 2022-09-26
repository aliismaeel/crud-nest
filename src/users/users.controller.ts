import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { Role } from 'src/common/roles.enum';
import { User } from './interfaces';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findall(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Post()
  @Roles(Role.SuperAdmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @UseGuards(AuthGuard('jwt'))
  async creatUser(@Body() createUser: any) {
    await this.userService.createUser(createUser);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.userService.findUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedData: any) {
    return this.userService.updateUser(id, updatedData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  // @Post('logIn')
  // async signIn(@Body() data: any) {
  //   await this.userService.signIn(data);
  //   return 'successfully logged in';
  // }
}
