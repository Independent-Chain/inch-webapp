import { Controller, Get, HttpException, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { MiningService } from './mining.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Controller('mining')
export class MiningController {
  constructor(private readonly miningService: MiningService, private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('claim/:userId')
  async getClaim(@Param('userId') userId: number) {
    const loot = await this.miningService.claim(userId)
    const transferData = await this.userService.allUserData(userId)
    transferData['loot'] = loot
    return transferData
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('upgrade/reactor/:userId')
  async getReactorUpgrade(@Param('userId') userId: number) {
    const result = await this.miningService.upgradeReactor(userId)
    if (result) {
      const transferData = await this.userService.allUserData(userId)
      return transferData
    } else {
      throw new HttpException('Server received the request, but the database did not reject it', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('upgrade/storage/:userId')
  async getStorageUpgrade(@Param('userId') userId: number) {
    const result = await this.miningService.upgradeStorage(userId)
    if (result) {
      const transferData = await this.userService.allUserData(userId)
      return transferData
    } else {
      throw new HttpException('Server received the request, but the database did not reject it', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
