import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() authPayload: AuthPayloadDTO) {
    console.log(authPayload);
    const token = this.authService.validateUser(authPayload);

    if (!token) throw new HttpException('Invalid credentials', 401);

    return token;
  }
}
