import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deleteUrl();
    await this.deleteUser();
  }

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'testUser',
      },
    });
    await this.prismaService.user.deleteMany({
      where: {
        username: 'usernameUpdated',
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'testUser',
        password: await bcrypt.hash('testUser', 10),
        name: 'testUser',
        token: 'test',
      },
    });
  }

  async createUrl() {
    await this.prismaService.url.create({
      data: {
        username: 'testUser',
        url: 'https://test.com/test',
        name: 'test-url-name',
      },
    });
  }

  async deleteUrl() {
    await this.prismaService.url.deleteMany({
      where: {
        username: 'testUser',
      },
    });
  }
}
