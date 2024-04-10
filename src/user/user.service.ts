import { Injectable } from '@nestjs/common';
import { UserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUser } from 'src/common/decorators';
import { UserAlreadyExistsError } from './errors';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(dto: UserDto) {
    const { email, password, lastName, firstName } = dto;

    const checkIfUserExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (checkIfUserExists)
      throw new UserAlreadyExistsError('Пользователь уже существует');

    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        lastName,
        firstName,
      },
    });
    return user;
  }

  async findUser(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  async getUserInfo(user: AuthUser) {
    const userInfo = await this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
    return userInfo;
  }
}
