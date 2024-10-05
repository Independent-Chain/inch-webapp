import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { convertBigIntToNumber } from 'src/utils/bigIntToNumber';

@Injectable()
export class RatingService {
	constructor(private prisma: PrismaService) {}

	async getUserRating(userId: number) {
		const { balance } = await this.prisma.users_app_data.findUnique({
			where: { user_id: userId },
			select: { balance: true },
		});

		const userRating = await this.prisma.users_app_data.count({
			where: { balance: { gt: balance } },
		});

		return userRating + 1
	}

	async getRating(userId: number) {
		const rating = await this.prisma.users_app_data.findMany({
			select: { 
				balance: true,
				metaData: {
					select: {
							username: true,
					},
				},
			},
			orderBy: { balance: 'desc' },
			take: 100, 
		});

		const users = rating.map(user => ({
			username: user.metaData.username,
			balance: user.balance
		}));

		return users
	}
}
