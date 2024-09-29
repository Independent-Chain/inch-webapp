import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DailyService } from './daily.service';

@Controller('daily')
export class DailyController {
  constructor(private readonly dailyService: DailyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('check/:userId')
  async checkDailyInformationHandler(@Param('userId') userId: number) {
    const result = await this.dailyService.checkDaily(userId);
    if (result) {
      return result;
    } else {
      throw new HttpException('Server received the request, but the database did not reject it [Check daily reward error]', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('take/:userId')
  async takeDailyRewardHandler(@Param('userId') userId: number) {
    const result = await this.dailyService.takeDailyReward(userId);
    if (result) {
      return result;
    } else {
      throw new HttpException('Server received the request, but the database did not reject it [Daily reward not received]', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
