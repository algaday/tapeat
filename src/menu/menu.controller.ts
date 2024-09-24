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
import { GetCurrentUser, AuthUser, Public } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { DeleteMenuItemDto } from './dto/delete-menu-item.dto';

@UseGuards(JwtGuard)
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Public()
  @Get('menu-item-info/:id')
  getMenuItem(@Param() params: { id: string }) {
    return this.menuService.getMenuItem(params);
  }

  @Get('menu-items')
  getAllMenuItems(@GetCurrentUser() user: AuthUser) {
    return this.menuService.findMenuItems(user);
  }

  @Post('create-menu-item')
  createMenuItem(
    @Body() dto: CreateMenuItemDto,
    @GetCurrentUser() user: AuthUser,
  ) {
    return this.menuService.createMenuItem(dto, user);
  }

  @Post('update-menu-item')
  updateMenuItem(@Body() dto: UpdateMenuItemDto) {
    return this.menuService.updateMenuItem(dto);
  }

  @Delete('delete-menu-item')
  deleteMenuItem(@Body() menuItemId: DeleteMenuItemDto) {
    return this.menuService.deleteMenuItem(menuItemId);
  }
}
