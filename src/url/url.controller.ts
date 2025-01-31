import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UrlService } from './url.service';
import { Auth } from '../common/auth.decorator';
import { User } from '@prisma/client';
import { UrlCreateRequest, UrlResponse } from '../model/url.model';
import { WebResponse } from '../model/web.model';

@Controller('/api/urls')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Body() request: UrlCreateRequest,
  ): Promise<WebResponse<UrlResponse>> {
    const result = await this.urlService.create(user, request);
    return {
      data: result,
    };
  }

  @Get()
  @HttpCode(200)
  async get(@Auth() user: User): Promise<WebResponse<UrlResponse[]>> {
    const result = await this.urlService.get(user);
    return {
      data: result,
    };
  }
}
