import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [UserModule, CommonModule, UrlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
