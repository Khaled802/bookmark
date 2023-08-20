import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepo } from 'src/user/user.repository';

@Injectable({})
export class AuthService {
  constructor(
    readonly prisma: PrismaService,
    readonly jwt: JwtService,
    readonly config: ConfigService,
    readonly prisma_user: UserRepo,
  ) {}

  async signup(body: AuthDTO) {
    if (this.prisma_user.is_exist_email(body.email))
      throw new BadRequestException({ msg: 'email is aleady exist' });
    return this.prisma_user.create(body.email, body.password);
  }

  async signin(body: AuthDTO) {
    const user = await this.prisma_user.get_user_or_null(
      body.email,
      body.password,
    );

    if (user === null)
      throw new UnauthorizedException({ msg: 'email or password was wrong' });

    const access_token = await this.getToken(user.id, user.email);
    return { access_token };
  }

  async getToken(userId: number, email: string) {
    const payload = {
      userId,
      email,
    };
    return this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
