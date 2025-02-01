import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { Auth } from '../common/auth.decorator';
import { User } from '@prisma/client';
import {
  UrlCreateRequest,
  UrlGetRequest,
  UrlResponse,
  UrlUpdateRequest,
} from '../model/url.model';
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
  async get(
    @Auth() user: User,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<WebResponse<UrlResponse[]>> {
    const request: UrlGetRequest = {
      page: page || 1,
      size: size || 10,
    };

    return await this.urlService.get(user, request);
  }

  @Delete('/:urlId')
  @HttpCode(200)
  async delete(
    @Auth() user: User,
    @Param('urlId', ParseIntPipe) urlId: number,
  ): Promise<WebResponse<boolean>> {
    await this.urlService.remove(user, urlId);

    return {
      data: true,
    };
  }

  @Patch()
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Body() request: UrlUpdateRequest,
  ): Promise<WebResponse<UrlResponse>> {
    const result = await this.urlService.update(user, request);
    return {
      data: result,
    };
  }
}
