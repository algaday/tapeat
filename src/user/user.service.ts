import { Injectable } from '@nestjs/common';
import { UserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserAlreadyExistsError } from './errors';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(dto: UserDto) {
    try {
      const { email, password, lastName, firstName, username } = dto;
      const user = await this.prisma.user.create({
        data: {
          email,
          password,
          lastName,
          firstName,
          username,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UserAlreadyExistsError('User Already Exists');
        }
      }
      throw error;
    }
  }

  async findUser(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  async getUserInfo(user) {
    const userInfo = await this.prisma.user.findFirst({
      where: {
        email: user,
      },
    });
    return userInfo;
  }
}
