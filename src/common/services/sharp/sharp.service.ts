import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
@Injectable()
export class SharpService {
  constructor() {}
  async formatImage(image: Express.Multer.File, resize: number) {
    const formattedImg = await sharp(image.buffer)
      .resize(resize)
      .webp()
      .toBuffer();

    return formattedImg;
  }
}
