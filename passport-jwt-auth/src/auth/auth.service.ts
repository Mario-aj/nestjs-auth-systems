import { Injectable } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  { id: 1, username: 'john', password: 'changeme' },
  { id: 2, username: 'maria', password: 'guess' },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}
  async validateUser({ password, username }: AuthPayloadDTO) {
    const user = fakeUsers.find((user) => user.username === username);

    console.log('foundUser', user);
    if (!user || password !== user.password) {
      return null;
    }

    console.log('after process user', user);
    delete user.password;

    const access_token = await this.jwt.signAsync(user);

    console.log('access_token', access_token);
    return { access_token };
  }
}
