import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { GetCurrentUser, AuthUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMenuItemImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    image: Express.Multer.File,
    @GetCurrentUser() currentUser: AuthUser,
  ) {
    return await this.menuService.uploadMenuItemImage(image, currentUser);
  }
}
