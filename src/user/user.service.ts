import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
          throw new ForbiddenException('User Exists');
        }
      }
      throw error;
    }
  }
}
