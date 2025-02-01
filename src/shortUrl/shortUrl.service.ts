import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { ShortUrlValidation } from './shortUrl.validation';
import { ShortUrlParam } from '../model/shortUrl.model';

@Injectable()
export class ShortUrlService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async get(url: ShortUrlParam) {
    this.logger.debug(`ShortUrlService.get(${JSON.stringify(url)})`);
    const createRequest: ShortUrlParam = await this.validationService.validate(
      ShortUrlValidation.GET,
      url,
    );

    console.log(url);

    const getUrl = await this.prismaService.url.findFirst({
      where: {
        name: createRequest.url,
      },
    });

    if (!getUrl) throw new HttpException('Url tidak ditemukan', 404);

    return getUrl.url;
  }
}
