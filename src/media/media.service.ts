import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { S3Service } from 'src/s3/s3.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
  constructor(
    private prisma: PrismaService,
    private restaurantService: RestaurantService,
    private s3Service: S3Service,
  ) {}

  async uploadMenuItemImage(image: Express.Multer.File, currentUser: AuthUser) {
    const restaurant =
      await this.restaurantService.getRestaurantByOwnerId(currentUser);

    const imageExtension = this.getMimeTypeExtension(image.mimetype);
    const imageSlug = `restaurants/${restaurant.id}/menu/${uuidv4()}.${imageExtension}`;

    await this.s3Service.uploadFile(imageSlug, image.buffer);

    return await this.prisma.image.create({
      data: {
        originalPath: `/${imageSlug}`,
        restaurantId: restaurant.id,
      },
    });
  }

  getMimeTypeExtension(mimetype: string) {
    const extensions = {
      'image/jpeg': 'jpeg',
      'image/jpg': 'jpg',
      'image/png': 'png',
    };

    return extensions[mimetype];
  }
}
