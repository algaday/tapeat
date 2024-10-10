import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { GetCurrentUser, AuthUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { DeleteMenuItemDto } from './dto/delete-menu-item.dto';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get('menu-item-info/:id')
  getMenuItem(@Param() params: { id: string }) {
    return this.menuService.getMenuItem(params);
  }

  @Get('menu-items')
  @UseGuards(JwtGuard)
  getAllMenuItems(@GetCurrentUser() user: AuthUser) {
    return this.menuService.findMenuItems(user);
  }

  @Post('create-menu-item')
  @UseGuards(JwtGuard)
  createMenuItem(
    @Body() dto: CreateMenuItemDto,
    @GetCurrentUser() user: AuthUser,
  ) {
    return this.menuService.createMenuItem(dto, user);
  }

  @Post('update-menu-item')
  @UseGuards(JwtGuard)
  updateMenuItem(@Body() dto: UpdateMenuItemDto) {
    return this.menuService.updateMenuItem(dto);
  }

  @Delete('delete-menu-item')
  @UseGuards(JwtGuard)
  deleteMenuItem(@Body() menuItemId: DeleteMenuItemDto) {
    return this.menuService.deleteMenuItem(menuItemId);
  }
}
