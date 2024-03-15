import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/user/dto';

@Injectable()
export class RestaurantOwnerService {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async restaurantOwnerSignup(dto: UserDto) {
    const registered = await this.authService.signup(dto);
    const user = this.jwtService.decode(registered.access_token);
    await this.prisma.restaurantOwner.create({
      data: {
        userId: user.sub,
      },
    });

    return registered;
  }
}
