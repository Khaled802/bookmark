import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { Public } from './guards/public.guard';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() body: AuthDTO) {
    return this.authService.signup(body);
  }

  @Public()
  @Post('signin')
  signin(@Body() body: AuthDTO) {
    return this.authService.signin(body);
  }
}
