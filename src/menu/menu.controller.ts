import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuDto } from './dto/menu.dto';
import { GetCurrentUser, UserInfo } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guards/jwt-guard';

@UseGuards(JwtGuard)
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}
  @Post('create-menu-item')
  createMenuItem(@Body() dto: MenuDto, @GetCurrentUser() userInfo: UserInfo) {
    return this.menuService.createMenuItem(dto, userInfo);
  }
}
