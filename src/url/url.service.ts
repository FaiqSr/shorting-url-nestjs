import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  UrlCreateRequest,
  UrlGetRequest,
  UrlResponse,
  UrlUpdateRequest,
} from '../model/url.model';
import { Logger } from 'winston';
import { UrlValidation } from './url.validation';
import { Url, User } from '@prisma/client';
import { WebResponse } from 'src/model/web.model';

@Injectable()
export class UrlService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  toUrlResponse(url: Url): UrlResponse {
    return {
      id: url.id,
      username: url.username,
      name: url.name,
      url: url.url,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    };
  }

  async checkUrlMustExists(username: string, urlId: number): Promise<Url> {
    const url = await this.prismaService.url.findFirst({
      where: {
        username: username,
        id: urlId,
      },
    });
    if (!url) {
      throw new HttpException('Url is not found', 404);
    }

    return url;
  }

  async create(user: User, request: UrlCreateRequest): Promise<UrlResponse> {
    this.logger.debug(
      `UrlServie.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );
    const createRequest: UrlCreateRequest =
      await this.validationService.validate(UrlValidation.CREATE, request);

    let urlData: Url = await this.prismaService.url.findFirst({
      where: {
        name: createRequest.name,
      },
    });

    if (urlData)
      throw new HttpException('Nama url sudah pernah digunakan', 401);

    urlData = await this.prismaService.url.create({
      data: {
        username: user.username,
        name: createRequest.name,
        url: createRequest.url,
      },
    });

    return {
      id: urlData.id,
      username: user.username,
      url: urlData.url,
      name: urlData.name,
      createdAt: urlData.createdAt,
      updatedAt: urlData.updatedAt,
    };
  }

  async get(
    user: User,
    request: UrlGetRequest,
  ): Promise<WebResponse<UrlResponse[]>> {
    const createRequest: UrlGetRequest = await this.validationService.validate(
      UrlValidation.GET,
      request,
    );

    const skip = (createRequest.page - 1) * createRequest.size;

    const url = this.prismaService.url.findMany({
      where: {
        username: user.username,
      },
      take: createRequest.size,
      skip: skip,
    });

    const total = await this.prismaService.url.count({
      where: {
        username: user.username,
      },
    });

    if (!url) throw new HttpException('Url is not found', 404);

    return {
      data: (await url).map((data) => this.toUrlResponse(data)),
      paging: {
        current_page: createRequest.page,
        size: createRequest.size,
        total_page: Math.ceil(total / createRequest.size),
      },
    };
  }

  async remove(user: User, urlId: number): Promise<UrlResponse> {
    await this.checkUrlMustExists(user.username, urlId);

    const url = await this.prismaService.url.delete({
      where: {
        id: urlId,
        username: user.username,
      },
    });

    return this.toUrlResponse(url);
  }

  async update(user: User, request: UrlUpdateRequest): Promise<UrlResponse> {
    const updateRequest: UrlUpdateRequest =
      await this.validationService.validate(UrlValidation.UPDATE, request);

    let url = await this.checkUrlMustExists(user.username, updateRequest.id);

    if (updateRequest.url) {
      url.url = updateRequest.url;
    }
    if (updateRequest.name) {
      url.name = updateRequest.name;
    }

    url = await this.prismaService.url.update({
      where: {
        id: updateRequest.id,
      },
      data: url,
    });

    return this.toUrlResponse(url);
  }
}
