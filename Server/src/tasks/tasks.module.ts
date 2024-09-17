import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [TasksController],
  providers: [PrismaService, TasksService],
})
export class TasksModule {}
