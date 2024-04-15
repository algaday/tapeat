import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class SharpService {
  async resize(image: Express.Multer.File, size: number) {
    const resizedImage = await sharp(image.buffer)
      .resize({ width: size, height: size })
      .webp()
      .toBuffer();

    return resizedImage;
  }
}
