import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getTasksHandler() {
    return await this.tasksService.getTasks()
  }
}
