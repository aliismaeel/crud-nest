import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userData: any) {
    console.log(userData);
    // const user: any = this.userService.signIn(userData);
    const user: any = await this.userService.signIn(userData);
    console.log(
      'User that is returning from userservice after found....',
      user,
    );

    const payload = { email: user.email, sub: user._id };
    console.log('sub', payload.sub);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
