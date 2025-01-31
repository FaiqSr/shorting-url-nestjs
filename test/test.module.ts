import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { PrismaService } from '../src/common/prisma.service';

@Module({
  providers: [TestService],
})
export class TestModule {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deleteUser();
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'test',
        name: 'test',
        password: 'test',
        token: 'test',
      },
    });
  }

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }
}
