import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class SharpService {
  constructor() {}
  async formatImage(image: Express.Multer.File) {
    const formattedImg = await sharp(image.buffer)
      .resize(1024)
      .webp()
      .toBuffer();

    return formattedImg;
  }
}
