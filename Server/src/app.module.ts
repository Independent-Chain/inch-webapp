import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MiningModule } from './mining/mining.module';
import { TasksModule } from './tasks/tasks.module';
import { DailyModule } from './daily/daily.module';

@Module({
  imports: [UserModule, AuthModule, MiningModule, TasksModule, DailyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
