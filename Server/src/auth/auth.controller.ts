import { Body, Controller, Headers, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  getToken(@Body() userId: number, @Headers('Authorization') authHeader: string) {
    const initData = authHeader.split(' ')[1];
    if (this.authService.login(initData)) {
      return { access_token: this.authService.generateToken(userId) };
    } else {
      throw new HttpException('Signature is invalid. Access to webApp blocked.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}