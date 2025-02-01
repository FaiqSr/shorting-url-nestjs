import { Controller, Get, Param, Redirect, Res } from '@nestjs/common';
import { ShortUrlService } from './shortUrl.service';

@Controller()
export class shortUrlController {
  constructor(private shortUrlService: ShortUrlService) {}

  @Get('/:url')
  @Redirect()
  async get(@Param('url') url: string, @Res() res) {
    const result = await this.shortUrlService.get({ url });

    return res.status(301).redirect(result);
  }
}
