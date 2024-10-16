import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { registrationDataInterface } from './interfaces/i.registrationData';

import { DateTime } from 'luxon';
import { convertBigIntToNumber } from 'src/utils/bigIntToNumber';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async createUser(registrationData: registrationDataInterface) {
        const { metaData, start_param } = registrationData
        
        metaData.is_premium = Boolean(metaData.is_premium)
        metaData.allows_write_to_pm = Boolean(metaData.allows_write_to_pm)
        
        const appData = {
            user_id: metaData.user_id,
            inviter_id: start_param,
            last_claim_time: DateTime.utc().setZone('utc').toISO(), 
            last_entry: new DateTime(DateTime.utc().setZone('utc')).minus({ days: 1 }).toISO(),
        }

        const createUser = async () => {
            const userExisting = await this.prisma.users_meta_data.findUnique({ where: { user_id: metaData.user_id }});

            if (userExisting === null) {
                await this.prisma.users_meta_data.create({ data: metaData });
                await this.prisma.users_app_data.create({ data: appData });

                if (start_param != undefined) {
                    await this.prisma.users_app_data.update({
                        where: { user_id: start_param },
                        data: {
                            balance: { increment: 100 },
                            friends: { increment: 1 }
                        }
                    })
                }

                return true
            } else {
                return false
            }
        }
        
        const result = await createUser();
        if (result) {
            return await this.allUserData(registrationData.metaData.user_id);
        } else {
            return false
        }
        
	}

    async allUserData(userId: number) {
        const _metaData = await this.prisma.users_meta_data.findUnique({ where: { user_id: userId }});
        const _appData = await this.prisma.users_app_data.findUnique({ where: { user_id: userId }});
        const _userTasks = await this.prisma.users_tasks_data.findMany({ where: { user_id: userId }});

        const metaData = convertBigIntToNumber(_metaData);
        const appData = {
            ...convertBigIntToNumber(_appData),
            last_claim_time: _appData.last_claim_time?.toISOString(),
            last_entry: _appData.last_entry?.toISOString(),
        };
        const tasksData = convertBigIntToNumber(_userTasks);

        return { metaData, appData, tasksData };
    }

    async changeLocale(userId: number, locale: string) {
        let newLocale: string
        
        if (locale === 'en') {
            newLocale = 'ru'
        } else {
            newLocale = 'en'
        }

        try{
            await this.prisma.users_app_data.update({
                where: { user_id: userId },
                data: { locale: newLocale }
            })
            return this.allUserData(userId)
        } catch(error) {
            throw error
        }
        
    }
}
