import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { UrlCreateRequest, UrlResponse } from '../model/url.model';
import { Logger } from 'winston';
import { UrlValidation } from './url.validation';
import { Url, User } from '@prisma/client';

@Injectable()
export class UrlService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

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
      username: user.username,
      url: urlData.url,
      name: urlData.name,
      createdAt: urlData.createdAt,
      updatedAt: urlData.updatedAt,
    };
  }

  async get(user: User): Promise<UrlResponse[]> {
    const url = this.prismaService.url.findMany({
      where: {
        username: user.username,
      },
    });

    if (!url) throw new HttpException('Url is not found', 404);

    return url;
  }
}
