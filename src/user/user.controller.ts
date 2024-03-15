import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { GetCurrentUser, UserInfo } from 'src/common/decorators/';
import { JwtGuard } from 'src/common/guards/jwt-guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  createUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getUserInfo(@GetCurrentUser() user: UserInfo) {
    return this.userService.getUserInfo(user);
  }
}
