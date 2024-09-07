import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MiningModule } from './mining/mining.module';

@Module({
  imports: [UserModule, AuthModule, MiningModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
