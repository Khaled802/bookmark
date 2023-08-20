import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class UserRepo {
  constructor(readonly prisma: PrismaService) {}

  async create(email: string, password: string): Promise<User> {
    const hashed_password = await this.generate_hash(password);

    return this.prisma.user.create({
      data: {
        email,
        password: hashed_password,
      },
    });
  }

  async is_exist_email(email: string) {
    return (await this.prisma.user.findUnique({ where: { email } })) != null;
  }

  async get_user_or_null(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user == null) return null;
    return (await bcrypt.compare(password, user.password)) ? user : null;
  }

  async generate_hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
