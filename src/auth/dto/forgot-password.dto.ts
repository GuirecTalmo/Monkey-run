/** DTO pour POST /api/auth/forgot-password */
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}
