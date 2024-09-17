import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TasksService {
	constructor(private prisma: PrismaService) {}

	async getTasks(userId: number) {
		
	}
}
