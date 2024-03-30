import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private user: UserService,
  ) {}
  async signup(dto: UserDto) {
    // generate the password hash
    const hash = await bcrypt.hash(dto.password, 10);
    //save the new user in the db
    const user = await this.user.createUser({ ...dto, password: hash });
    //return the saved user
    return user;
  }
  async signin(dto: AuthDto) {
    //find the user by email}
    const user = await this.user.findUser(dto.email);
    //if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');
    //compare password
    const pwMatches = await bcrypt.compare(dto.password, user.password);
    //if password is incorrect throw an exception
    if (!pwMatches) throw new ForbiddenException('Wrong password');
    //send back the user
    return this.signToken(user.id, user.email);
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
