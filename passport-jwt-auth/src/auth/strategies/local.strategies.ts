import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authSearvice: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log('params', { username, password });
    const user = await this.authSearvice.validateUser({ username, password });

    if (!user) throw new UnauthorizedException();

    console.log('user', user);
    return user;
  }
}
