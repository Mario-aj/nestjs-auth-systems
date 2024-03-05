import { Controller, Get, Post, UseGuards, Res, Req } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';
import { PublicRoute } from './utils/public-routes.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
    const user = await this.authService.login(req.user);

    return user;
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @PublicRoute()
  @Get('')
  getHello(@Res() res: Response) {
    return res.json({ message: 'Hello world' });
  }
}
