import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { registrationDataDto } from './dto/dto.registrationDataDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createUserHandler(@Body() registrationData: registrationDataDto) {
    const result = await this.userService.createUser(registrationData);
    if (result) {
      return result;
    } else {
      throw new HttpException('Server received the request, but the database did not reject it', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get/:userId')
  async getUserHandler(@Param('userId') userId: number) {
    return await this.userService.allUserData(userId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('locale/:userId')
  async getLocale(@Param('userId') userId: number, @Query('locale') locale: string) {
    return await this.userService.changeLocale(userId, locale)
  }
}
