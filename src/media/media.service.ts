import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { S3Service } from 'src/common/services/s3/s3.service';
import { v4 as uuidv4 } from 'uuid';
import { SharpService } from 'src/common/services/sharp';

@Injectable()
export class MediaService {
  private ORIGINAL_IMAGE_RESOLUTION = 1024;

  private MEDIUM_THUMBNAIL_IMAGE_RESOLUTION = 256;

  private SMALL_THUMBNAIL_IMAGE_RESOLUTION = 128;

  constructor(
    private prisma: PrismaService,
    private restaurantService: RestaurantService,
    private s3Service: S3Service,
    private sharpService: SharpService,
  ) {}

  async uploadMenuItemImage(image: Express.Multer.File, user: AuthUser) {
    const originalImage = await this.sharpService.formatImage(
      image,
      this.ORIGINAL_IMAGE_RESOLUTION,
    );

    const mediumThumbnailImage = await this.sharpService.formatImage(
      image,
      this.MEDIUM_THUMBNAIL_IMAGE_RESOLUTION,
    );

    const smallThumbnailImage = await this.sharpService.formatImage(
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
}
