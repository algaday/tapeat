import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/common/services/s3/s3.service';
import { v4 as uuidv4 } from 'uuid';
import { SharpService } from 'src/common/services/sharp';
import { Prisma } from '@prisma/client';
import { GenerateImageSlugData as ImageSlugData } from './types';

@Injectable()
export class MediaService {
  private ORIGINAL_IMAGE_RESOLUTION = 1024;

  private MEDIUM_THUMBNAIL_IMAGE_RESOLUTION = 256;

  private SMALL_THUMBNAIL_IMAGE_RESOLUTION = 128;

  private RESOLUTIONS = [
    this.ORIGINAL_IMAGE_RESOLUTION,
    this.MEDIUM_THUMBNAIL_IMAGE_RESOLUTION,
    this.SMALL_THUMBNAIL_IMAGE_RESOLUTION,
  ];

  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
    private sharpService: SharpService,
  ) {}

  async uploadMenuItemImage(image: Express.Multer.File, user: AuthUser) {
    const uuid = uuidv4();

    const uploadImages = this.RESOLUTIONS.map(async (resolution) => {
      const imagePath = this.generateImagePath({
        resolution,
        uuid,
        restaurantId: user.restaurantId,
      });

      const resizedImage = await this.sharpService.resize(image, resolution);

      await this.uploadImage(resizedImage.buffer, imagePath);

      return imagePath;
    });

    const [originalPath, mediumThumbnailPath, smallThumbnailPath] =
      await Promise.all(uploadImages);

    return await this.prisma.image.create({
      data: {
        originalPath,
        mediumThumbnailPath,
        smallThumbnailPath,
        restaurantId: user.restaurantId,
      },
    });
  }

  async uploadImage(image: Buffer, imageSlug: string) {
    return this.s3Service.uploadFile(imageSlug, image);
  }

  generateImagePath(data: ImageSlugData) {
    return `restaurants/${data.restaurantId}/menu/${data.uuid}_${data.resolution}.webp`;
  }

  async markImageAssigned(imageId: string) {
    return this.updateImage(imageId, { isAssigned: true });
  }

  async markImageUnassigned(imageId: string) {
    return this.updateImage(imageId, { isAssigned: false });
  }

  async updateImage(imageId: string, data: Prisma.ImageUpdateInput) {
    return this.prisma.image.update({
      where: {
        id: imageId,
      },
      data,
    });
  }
}
