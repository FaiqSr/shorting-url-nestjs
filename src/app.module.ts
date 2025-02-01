import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { UrlModule } from './url/url.module';
import { ShortUrlModule } from './shortUrl/shortUrl.module';

@Module({
  imports: [UserModule, CommonModule, UrlModule, ShortUrlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
