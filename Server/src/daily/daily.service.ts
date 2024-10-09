import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { DateTime } from 'luxon';

@Injectable()
export class DailyService {
	constructor(private prisma: PrismaService) {}

	async checkDaily(userId: number) {
		const userDailyData = await this.prisma.users_app_data.findFirst({
			select: { last_entry: true, streak_days: true },
			where: { user_id: userId }
		})

		const currentTime: DateTime = DateTime.utc();
		const lastEntry: DateTime = DateTime.fromISO(userDailyData.last_entry.toISOString(), { zone: 'utc' });
		const timeDifference: number = currentTime.diff(lastEntry, 'seconds').seconds;

		if (86400 <= timeDifference && timeDifference <= 172800) {
			return {
				type: 'newDay',
				streak_days: userDailyData.streak_days + 1,
				reward: (userDailyData.streak_days + 1) * 10
			}
		} else if (timeDifference < 172800) {
			return { type: 'currentDay' }
		} else if (172800 < timeDifference) {
			return { 
				type: 'lostDay', 
				streak_days: 1, 
				reward: 10
			}
		}
	}

	async takeDailyReward(userId: number) {
		const dataAboutDaily = await this.checkDaily(userId);

		try{
			await this.prisma.users_app_data.update({
				where: { user_id: userId },
				data: {
					balance: { increment: dataAboutDaily.reward } ,
					streak_days: dataAboutDaily.streak_days,
					last_entry: DateTime.utc().setZone('utc').toISO()
				}
			})
			return true
		} catch(error) {
			return false
		}
	}
}
