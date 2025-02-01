import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  UserLoginRequest,
  UserRegisterRequest,
  UserResponse,
  UserUpdateRequest,
} from '../model/user.model';
import { Logger } from 'winston';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private readonly validationService: ValidationService,
    private prismaService: PrismaService,
  ) {}

  async register(request: UserRegisterRequest): Promise<UserResponse> {
    this.logger.debug(`UserService.register(${JSON.stringify(request)})`);

    const registerUserRequest: UserRegisterRequest =
      await this.validationService.validate(UserValidation.REGISTER, request);

    const totalUserWithSameUsername = await this.prismaService.user.count({
      where: {
        username: registerUserRequest.username,
      },
    });

    if (totalUserWithSameUsername != 0) {
      throw new HttpException('Username already exists', 401);
    }

    registerUserRequest.password = await bcrypt.hash(
      registerUserRequest.password,
      10,
    );

    const user = await this.prismaService.user.create({
      data: registerUserRequest,
    });

    return {
      username: user.username,
      name: user.name,
    };
  }

  async login(request: UserLoginRequest): Promise<UserResponse> {
    this.logger.debug(`UserService.login(${JSON.stringify(request)})`);

    const requestLogin: UserLoginRequest =
      await this.validationService.validate(UserValidation.LOGIN, request);

    let user = await this.prismaService.user.findUnique({
      where: {
        username: requestLogin.username,
      },
    });

    if (!user) throw new HttpException('Username or password is invalid', 401);

    const isPasswordValid = await bcrypt.compare(
      requestLogin.password.toString(),
      user.password,
    );

    if (!isPasswordValid)
      throw new HttpException('Username or password is invalid', 401);

    user = await this.prismaService.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: uuid(),
      },
    });

    return {
      username: user.username,
      name: user.name,
      token: user.token,
    };
  }

  async get(user: User): Promise<UserResponse> {
    return {
      username: user.username,
      name: user.name,
      token: user.token,
    };
  }

  async update(user: User, request: UserUpdateRequest): Promise<UserResponse> {
    this.logger.debug(
      `UserService.update(${JSON.stringify(user.username)}, ${JSON.stringify(request)})`,
    );

    const usernameNow = user.username;

    const createRequest: UserUpdateRequest =
      await this.validationService.validate(UserValidation.UPDATE, request);

    if (createRequest.name) {
      user.name = createRequest.name;
    }

    if (createRequest.password) {
      user.password = await bcrypt.hash(createRequest.password, 10);
    }

    if (createRequest.username) {
      user.username = createRequest.username;

      const usernameList = await this.prismaService.user.count({
        where: {
          username: createRequest.username,
        },
      });
      if (usernameList) throw new HttpException('Username harus unik', 401);
    }

    const result = await this.prismaService.user.update({
      where: {
        username: usernameNow,
      },
      data: user,
    });

    await this.prismaService.url.updateMany({
      where: {
        username: usernameNow,
      },
      data: {
        username: user.username,
      },
    });

    return {
      name: result.name,
      username: result.username,
    };
  }

  async logout(user: User): Promise<UserResponse> {
    await this.prismaService.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });

    return {
      username: user.username,
      name: user.name,
    };
  }
}
