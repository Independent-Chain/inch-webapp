import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  getToken(@Body() userId: number) {
    return { access_token: this.authService.generateToken(userId) }
  }
}