import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
      session: false,
    });
  }

  async validate(
    request: Request,
    username: string,
    password: string,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const contextId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleRef.resolve(AuthService, contextId);

    const user = await authService.validateUsers(username, password);

    if (!user) {
      return done(new UnauthorizedException('Credencias invalidas'), false);
    }

    return done(null, user);
  }
}
