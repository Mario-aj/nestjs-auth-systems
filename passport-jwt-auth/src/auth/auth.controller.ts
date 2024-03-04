import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authPayload: AuthPayloadDTO) {
    const token = await this.authService.validateUser(authPayload);

    if (!token) throw new HttpException('Invalid credentials', 401);

    return token;
  }
}
