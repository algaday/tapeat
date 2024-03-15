import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/user/dto';

@Injectable()
export class RestaurantOwnerService {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  async restaurantOwnerSignup(dto: UserDto) {
    const user = await this.authService.signup(dto);
    await this.prisma.restaurantOwner.create({
      data: {
        userId: user.id,
      },
    });
    return await this.authService.signToken(user.id, user.email);
  }
}
