import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { AuthDto } from 'src/auth/dto';
import { UserService } from 'src/user/user.service';
import { ApplicationError } from 'src/errors';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomerService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async createCustomer(userDto: CreateCustomerDto) {
    const { user, customer } = await this.prisma.$transaction(async () => {
      const user = await this.authService.signup(userDto);

      const customer = await this.prisma.customer.create({
        data: {
          userId: user.id,
          address: userDto.address,
        },
      });

      return { user, customer };
    });

    const accessToken = await this.authService.signToken(
      customer.id,
      user.email,
    );

    return { user, accessToken };
  }

  async loginCustomer(dto: AuthDto) {
    const user = await this.userService.findUser(dto.email);

    if (!user) throw new ApplicationError('Credentials incorrect');

    const pwMatches = await bcrypt.compare(dto.password, user.password);

    if (!pwMatches) throw new ApplicationError('Wrong password');

    const customer = await this.prisma.customer.findUnique({
      where: {
        userId: user.id,
      },
    });

    const accessToken = await this.signToken(customer.id, user.email);

    return {
      accessToken,
      user,
    };
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = { sub: userId, email };

    const token = await this.jwt.signAsync(payload);
    return { accessToken: token };
  }
}
