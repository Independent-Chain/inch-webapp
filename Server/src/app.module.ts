import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MiningModule } from './mining/mining.module';
import { TasksModule } from './tasks/tasks.module';
import { DailyModule } from './daily/daily.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [UserModule, AuthModule, MiningModule, TasksModule, DailyModule, RatingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
