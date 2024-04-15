import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import {
  CreateMenuItemDto,
  ModificationGroupDto,
} from './dto/create-menu-item.dto';
import { GetCurrentUser, AuthUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guards/jwt-guard';

@UseGuards(JwtGuard)
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get('menu-item-info/:id')
  getMenuItem(@Param() params: { id: string }) {
    return this.menuService.getMenuItem(params);
  }

  @Get('menu-items')
  getAllMenuItems(@GetCurrentUser() user: AuthUser) {
    return this.menuService.getAllMenuItems(user);
  }

  @Post('create-menu-item')
  createMenuItem(
    @Body() dto: CreateMenuItemDto,
    @GetCurrentUser() user: AuthUser,
  ) {
    return this.menuService.createMenuItem(dto, user);
  }

  @Post('modification')
  createModificationGroup(@Body() dto: ModificationGroupDto) {
    return this.menuService.createModificationGroup(dto);
  }
}
