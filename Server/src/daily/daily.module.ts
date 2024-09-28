import { Module } from '@nestjs/common';
import { DailyService } from './daily.service';
import { DailyController } from './daily.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [DailyController],
  providers: [PrismaService, DailyService],
})
export class DailyModule {}
