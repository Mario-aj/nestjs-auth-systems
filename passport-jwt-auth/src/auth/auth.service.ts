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
    const user = fakeUsers.find((user) => (user.username = username));

    if (!user || password !== user.password) {
      return null;
    }

    delete user.password;

    console.log(user);

    const access_token = this.jwt.sign(user);

    return { access_token };
  }
}
