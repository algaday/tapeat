import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { UserDto } from 'src/user/dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() dto: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signup(dto);
    const { accessToken } = await this.authService.signToken(
      user.id,
      user.email,
    );
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    res.cookie('token', accessToken, {
      httpOnly: true,
      expires: expirationDate,
    });
  }

  @Post('signin')
  async signin(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.authService.signin(dto);
    const { id, email, firstName, lastName } = user;
    const expirationDate = new Date();

    expirationDate.setDate(expirationDate.getDate() + 1);

    res.cookie('token', accessToken, {
      httpOnly: true,
      expires: expirationDate,
    });

    return { id, email, firstName, lastName };
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('token', '', { expires: new Date() });
  }
}
