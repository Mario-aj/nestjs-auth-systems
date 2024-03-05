import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async validateUsers(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user || user.password !== pass) return null;

    delete user.password;

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
