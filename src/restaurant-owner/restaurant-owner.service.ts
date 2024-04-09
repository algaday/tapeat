import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpRestaurantOwnerDto } from './dto';

@Injectable()
export class RestaurantOwnerService {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  async restaurantOwnerSignup(dto: SignUpRestaurantOwnerDto) {
    const { restaurantName, ...userDto } = dto;

    const user = await this.authService.signup(userDto);

    await this.prisma.$transaction([
      this.prisma.restaurantOwner.create({
        data: {
          userId: user.id,
        },
      }),
      this.prisma.restaurant.create({
        data: {
          name: restaurantName,
          ownerId: user.id,
        },
      }),
    ]);

    const accessToken = await this.authService.signToken(user.id, user.email);

    return { user, accessToken };
  }
}
