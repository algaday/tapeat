import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { GetCurrentUser } from 'src/common/decorators/';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  createUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto);
  }

  @Get('me')
  getUserInfo(@GetCurrentUser() user) {
    return this.userService.getUserInfo(user);
  }
}
