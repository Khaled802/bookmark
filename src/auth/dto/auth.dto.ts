import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  password: string;
}
