import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/common/services/s3/s3.service';
import { v4 as uuidv4 } from 'uuid';
import { SharpService } from 'src/common/services/sharp';
import { Prisma } from '@prisma/client';

@Injectable()
export class MediaService {
  private ORIGINAL_IMAGE_RESOLUTION = 1024;

  private MEDIUM_THUMBNAIL_IMAGE_RESOLUTION = 256;

  private SMALL_THUMBNAIL_IMAGE_RESOLUTION = 128;

  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
    private sharpService: SharpService,
  ) {}

  async uploadMenuItemImage(image: Express.Multer.File, user: AuthUser) {
    const originalImage = await this.sharpService.resize(
      image,
      this.ORIGINAL_IMAGE_RESOLUTION,
    );

    const mediumThumbnailImage = await this.sharpService.resize(
      image,
      this.MEDIUM_THUMBNAIL_IMAGE_RESOLUTION,
    );

    const smallThumbnailImage = await this.sharpService.resize(
      image,
      this.SMALL_THUMBNAIL_IMAGE_RESOLUTION,
    );

    const originalImageSlug = `restaurants/${user.restaurantId}/menu/${uuidv4()}.webp`;

    const mediumThumbnailImageSlug = `restaurants/${user.restaurantId}/menu/${uuidv4()}.webp`;

    const smallThumbnailImageSlug = `restaurants/${user.restaurantId}/menu/${uuidv4()}.webp`;

    await Promise.all([
      this.s3Service.uploadFile(originalImageSlug, originalImage),
      this.s3Service.uploadFile(mediumThumbnailImageSlug, mediumThumbnailImage),
      this.s3Service.uploadFile(smallThumbnailImageSlug, smallThumbnailImage),
    ]);

    return await this.prisma.image.create({
      data: {
        originalPath: `/${originalImageSlug}`,
        mediumThumbnailPath: `/${mediumThumbnailImageSlug}`,
        smallThumbnailPath: `/${smallThumbnailImageSlug}`,
        restaurantId: user.restaurantId,
      },
    });
  }

  async markImageAssigned(imageId: string) {
    return this.updateImage(imageId, { isAssigned: true });
  }

  async markImageUnassigned(imageId: string) {
    return this.updateImage(imageId, { isAssigned: false });
  }

  private async updateImage(imageId: string, data: Prisma.ImageUpdateInput) {
    return this.prisma.image.update({
      where: {
        id: imageId,
      },
      data,
    });
  }
}
