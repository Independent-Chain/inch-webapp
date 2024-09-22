import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { completedTaskData } from './interfaces/i.completedTaskData';

import { DateTime } from 'luxon';
import { convertBigIntToNumber } from 'src/utils/bigIntToNumber';

@Injectable()
export class TasksService {
	constructor(private prisma: PrismaService) {}

	async getTasks(userId: number) {
		const _allTasks = await this.prisma.tasks.findMany()
		const allTasks = {...convertBigIntToNumber(_allTasks)}
		return allTasks
	}

	async completeTask(completedTaskData: completedTaskData) {
		const userId: number = completedTaskData.user_id;
		const taskId: number = completedTaskData.task_id;

		const checkEarlyComplete = await this.prisma.users_tasks_data.findFirst({
			where: {
				user_id: userId,
				task_id: taskId
			}
		})
		
		if (checkEarlyComplete === null) {
			const taskData = await this.prisma.tasks.findUnique({
				where: { task_id: taskId }
			})

			// Award accrual;
			await this.prisma.users_app_data.update({
				where: { user_id: userId },
				data: { balance: { increment: taskData.award } }
			})

			// Create record in user_tasks_data;
			await this.prisma.users_tasks_data.create({
				data: {
					user_id: userId,
					task_id: taskId,
					complete_time: DateTime.utc().setZone('utc').toISO()
				}
			})

			return true
		} else {
			return false;
		}
	}
}
