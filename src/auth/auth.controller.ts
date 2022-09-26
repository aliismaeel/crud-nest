import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: any) {
    // const accessToken = await this.userService.signIn(data);
    const accessToken = await this.authService.login(data);
    console.log(accessToken);
    return accessToken;
  }
}
