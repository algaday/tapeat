import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { S3Service } from 'src/common/services/s3/s3.service';
import { v4 as uuidv4 } from 'uuid';
import { SharpService } from 'src/common/services/sharp';

@Injectable()
export class MediaService {
  constructor(
    private prisma: PrismaService,
    private restaurantService: RestaurantService,
    private s3Service: S3Service,
    private sharpService: SharpService,
  ) {}

  async uploadMenuItemImage(image: Express.Multer.File, currentUser: AuthUser) {
    const restaurant =
      await this.restaurantService.getRestaurantByOwnerId(currentUser);
    const formatImage = await this.sharpService.formatImage(image);
    const imageSlug = `restaurants/${restaurant.id}/menu/${uuidv4()}.webp`;
    await this.s3Service.uploadFile(imageSlug, formatImage);

    return await this.prisma.image.create({
      data: {
        originalPath: `/${imageSlug}`,
        restaurantId: restaurant.id,
      },
    });
  }
}
