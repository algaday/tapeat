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
    const originalImage = await this.uploadImageToCloud(
      image,
      this.ORIGINAL_IMAGE_RESOLUTION,
      user,
    );

    const mediumThumbnailImage = await this.uploadImageToCloud(
      image,
      this.MEDIUM_THUMBNAIL_IMAGE_RESOLUTION,
      user,
    );

    const smallThumbnailImage = await this.uploadImageToCloud(
      image,
      this.SMALL_THUMBNAIL_IMAGE_RESOLUTION,
      user,
    );

    return await this.prisma.image.create({
      data: {
        originalPath: `/${originalImage}`,
        mediumThumbnailPath: `/${mediumThumbnailImage}`,
        smallThumbnailPath: `/${smallThumbnailImage}`,
        restaurantId: user.restaurantId,
      },
    });
  }

  async uploadImageToCloud(
    image: Express.Multer.File,
    resolution: number,
    user: AuthUser,
  ) {
    const resizedImage = await this.sharpService.resize(image, resolution);

    const imageSlug = `restaurants/${user.restaurantId}/menu/${uuidv4()}.webp`;

    await this.s3Service.uploadFile(imageSlug, resizedImage);

    return imageSlug;
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
