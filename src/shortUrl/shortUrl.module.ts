import { Module } from '@nestjs/common';
import { ShortUrlService } from './shortUrl.service';
import { shortUrlController } from './shortUrl.controller';

@Module({
  providers: [ShortUrlService],
  controllers: [shortUrlController],
})
export class ShortUrlModule {}
