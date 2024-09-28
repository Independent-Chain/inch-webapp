import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { DateTime } from 'luxon';

@Injectable()
export class DailyService {
	constructor(private prisma: PrismaService) {}

	async checkDaily(userId: number) {
		const userDailyData = await this.prisma.users_app_data.findFirst({
			select: {
				last_entry: true,
				streak_days: true,
			},
			where: {
				user_id: userId
			}
		})

		const currentTime = DateTime.utc();
		const lastEntry = DateTime.fromISO(userDailyData.last_entry.toISOString(), { zone: 'utc' });
		const timeDifference = currentTime.diff(lastEntry, 'seconds').seconds;

		if (86400 <= timeDifference && timeDifference <= 172800) {
			return {
				type: 'newDay',
				streak_days: userDailyData.streak_days + 1,
				reward: (userDailyData.streak_days + 1) * 10
			}
		} else if (timeDifference < 172800) {
			return { type: 'currentDay' }
		} else if (172800 < timeDifference) {
			return { type: 'lostDay' }
		}
	}

	async takeDailyReward(userId: number) {
		const dataAboutDay = await this.checkDaily(userId);
		const reward = dataAboutDay.reward;
		try{
			await this.prisma.users_app_data.update({
				where: { user_id: userId },
				data: {
					balance: { increment: dataAboutDay.streak_days * 10 },
					streak_days: { increment: dataAboutDay.streak_days + 1 },
					last_entry: DateTime.utc().setZone('utc').toISO()
				}
			})
			return true
		} catch(error) {
			return false
		}
	}
}
