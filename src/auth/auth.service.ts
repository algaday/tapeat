import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ApplicationError } from 'src/errors';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private user: UserService,
  ) {}
  async signup(dto: UserDto) {
    // generate the password hash
    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.user.createUser({ ...dto, password: hash });
    return user;
  }
  async signin(dto: AuthDto) {
    const user = await this.user.findUser(dto.email);

    if (!user) throw new ApplicationError('Credentials incorrect');

    const pwMatches = await bcrypt.compare(dto.password, user.password);

    if (!pwMatches) throw new ApplicationError('Wrong password');

    const restaurant = await this.user.getRestaurantByOwner(user.id);

    const accessToken = restaurant
      ? await this.signToken(user.id, user.email, restaurant.id)
      : await this.signToken(user.id, user.email);

    return {
      accessToken,
      user,
    };
  }
  async signToken(
    userId: string,
    email: string,
    restaurantId?: string,
  ): Promise<{ accessToken: string }> {
    const payload = { sub: userId, email, restaurantId };

    const token = await this.jwt.signAsync(payload);
    return { accessToken: token };
  }
}
