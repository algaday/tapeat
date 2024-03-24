import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuItemDto, ModificationDto } from './dto/create-menu-item.dto';
import { GetCurrentUser, AuthUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guards/jwt-guard';

@UseGuards(JwtGuard)
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}
  @Post('create-menu-item')
  createMenuItem(
    @Body() dto: CreateMenuItemDto,
    @GetCurrentUser() userInfo: AuthUser,
  ) {
    return this.menuService.createMenuItem(dto, userInfo);
  }

  @Post('create-modification')
  createModification(@Body() dto: ModificationDto) {
    return this.menuService.createModification(dto);
  }

  @Get('modifications')
  getModifications() {
    return this.menuService.getModifications();
  }
}
