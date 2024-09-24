import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthUser, GetCurrentUser } from 'src/common/decorators';
import { MediaService } from './media.service';
import { JwtGuard } from 'src/common/guards/jwt-guard';

@Controller('media')
@UseGuards(JwtGuard)
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMenuItemImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    image: Express.Multer.File,
    @GetCurrentUser() user: AuthUser,
  ) {
    return this.mediaService.uploadMenuItemImage(image, user);
  }
}
