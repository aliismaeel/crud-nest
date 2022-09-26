import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/interfaces';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('User') private userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log('payloda from jwt strategy....=>', payload);
    // const user: any = this.userModel.findById({ _id: payload.sub });
    const user: any = await this.userModel.findOne({ email: payload.email });
    console.log('user................................=>', user);
    if (user) {
      return {
        _id: user._id,
        email: user.email,
        userRole: user.userRole,
      };
    } else {
      throw new UnauthorizedException('invalid credentials');
    }
  }
}
