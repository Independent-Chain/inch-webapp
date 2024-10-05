import { Controller, Get, HttpException, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userId')
  async getUserRatingHandler(@Param('userId') userId: number) {
    const result = await this.ratingService.getUserRating(userId)
    if (result) {
      return result
    } else {
      throw new HttpException('Server received the request, but the database did not reject it', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('holders/:userId')
  async getRatingHandler(@Param('userId') userId: number) {
    const result = await this.ratingService.getRating(userId)
    if (result) {
      return result
    } else {
      throw new HttpException('Server received the request, but the database did not reject it', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
