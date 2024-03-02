import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { hash, compare } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { accessTokenNameCookie, jwtSecret } from 'src/utils/contants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new BadRequestException('Email already exist');
    }

    const hashedPassword = await this.hashPassword(password);

    const createdUser = this.prisma.user.create({
      data: { email, password: hashedPassword },
    });

    delete (await createdUser).password;

    return createdUser;
  }

  async signin(dto: AuthDto, req: Request, res: Response) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }

    const isPasswordCorrect = await this.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken({
      id: user.id,
      email: user.email,
    });

    if (!token) {
      throw new ForbiddenException();
    }

    delete user.password;

    res.cookie(accessTokenNameCookie, token);

    return res.status(200).json(user);
  }

  async signout(req: Request, res: Response) {
    res.clearCookie(accessTokenNameCookie);

    return res.json({ success: true });
  }

  private async hashPassword(password: string) {
    const salt = 16;

    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  }

  private async comparePassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }

  private async signToken(payload: { id: string; email: string }) {
    return await this.jwt.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: '1d',
    });
  }
}
