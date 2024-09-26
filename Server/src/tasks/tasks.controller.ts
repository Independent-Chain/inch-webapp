import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';

import { completedTaskDataDto } from './dto/dto.completedTaskDatDto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all/:userId')
  async getTasksHandler(@Param('userId') userId: number) {
    return await this.tasksService.getTasks(userId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('complete')
  async completeTaskHandler(@Body() completedTaskData: completedTaskDataDto) {
    const result = await this.tasksService.completeTask(completedTaskData);
    if (result) {
      return result;
    } else {
      throw new HttpException('Server received the request, but the database did not reject it [Task already completed]', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
