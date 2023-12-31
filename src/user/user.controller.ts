import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard)
  @Get()
  async showUsers(@Req() user: any) {
    console.log(user.user);
    return { user: 'non' };
  }
}
