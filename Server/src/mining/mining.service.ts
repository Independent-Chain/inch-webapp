import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { calculateLoot } from 'src/utils/calculateLoot';

import { DateTime } from 'luxon';

@Injectable()
export class MiningService {
	constructor(private prisma: PrismaService) {}

	async claim(userId: number) {
		const { inviter_id, last_claim_time, reactor, storage } = await this.prisma.users_app_data.findUnique({
			where: { user_id: userId },
			select: {
				inviter_id: true,
				last_claim_time: true,
				reactor: true,
				storage: true
			}
		})

		const loot = calculateLoot(last_claim_time.toISOString(), reactor, storage)
		
		// Update user balance;
		await this.prisma.users_app_data.update({
			where: { user_id: userId },
			data: { 
				referral_deduction: { increment: loot / 100 * 15 },
				balance: { increment: loot },
				last_claim_time: DateTime.utc().setZone('utc').toISO(),
			}
		})

		// Update inviter balance;
		if (inviter_id) {
			await this.prisma.users_app_data.update({
				where: { user_id: inviter_id },
				data: {
					referral_income: { increment: loot / 100 * 15 },
					balance: { increment: loot / 100 * 15 }
				}
			})
		}

		return loot
	}

	async upgradeReactor(userId: number) {
		const { balance, reactor } = await this.prisma.users_app_data.findUnique({ where: { user_id: userId }, select: { balance: true, reactor: true } })
		const reactorPrice =  150 * 2.2 ** (reactor - 1)
		
		if (balance > reactorPrice) {
			try {
				await this.prisma.users_app_data.update({
					where: { user_id: userId },
					data: { 
						balance: { decrement: reactorPrice },
						reactor: { increment: 1 }
					}
				})
				return true
			} catch(error) {
				return false
			}
		} else {
			return false
		}
	}

	async upgradeStorage(userId: number) {
		const { balance, storage } = await this.prisma.users_app_data.findUnique({ where: { user_id: userId }, select: { balance: true, storage: true } })
		const storagePrice =  75 * 2.2 ** (storage - 1)

		if (balance > storagePrice) {
			try {
				await this.prisma.users_app_data.update({
					where: { user_id: userId },
					data: { 
						balance: { decrement: storagePrice },
						storage: { increment: 1 }
					}
				})
				return true
			} catch(error) {
				return false
			}
		} else {
			return false
		}
	}
}
