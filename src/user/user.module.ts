import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepo } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepo],
  exports: [UserRepo],
})
export class UserModule {}
