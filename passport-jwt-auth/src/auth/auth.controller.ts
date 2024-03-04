import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDTO } from './dto/auth.dto';
import { LocalGuards } from './guards/local.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuards)
  async login(@Body() authPayload: AuthPayloadDTO) {
    const token = await this.authService.validateUser(authPayload);
    console.log('token', token);
    if (!token) throw new HttpException('Invalid credentials', 401);
    return token;
  }
}
