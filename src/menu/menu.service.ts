import { Injectable } from '@nestjs/common';

import { RestaurantService } from 'src/restaurant/restaurant.service';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto, ModificationGroupDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { MenuItemImage } from '@prisma/client';

@Injectable()
export class MenuService {
  private readonly s3Client = new S3Client({
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
    },
    endpoint: this.configService.get('AWS_HOST'),
    forcePathStyle: true,
    region: this.configService.get('AWS_REGION'),
  });
  private menuItemImage: MenuItemImage;
  private menuId: number;

  constructor(
    private readonly configService: ConfigService,
    private restaurantService: RestaurantService,
    private prisma: PrismaService,
  ) {}
  async createMenuItem(dto: CreateMenuItemDto, userInfo: AuthUser) {
    const { name, category, description, price, modificationGroups } = dto;
    const restaurant =
      await this.restaurantService.getRestaurantByOwnerId(userInfo);

    const menuItem = await this.prisma.menuItem.create({
      data: {
        nameOfDish: name,
        category,
        description,
        price,
        imageId: this.menuItemImage.id,
        restaurantId: restaurant.id,
      },
    });

    this.menuId = menuItem.id;

    if (modificationGroups?.length === 0) {
      return menuItem;
    }

    const menuItemWithModifications =
      await this.addMenuItemModificationGroups(modificationGroups);

    return menuItemWithModifications;
  }

  async addMenuItemModificationGroups(
    modificationGroups: ModificationGroupDto[],
  ) {
    for (const modification of modificationGroups) {
      const modificationItem = await this.prisma.modificationGroup.create({
        data: {
          name: modification.name,
          menuItemId: this.menuId,
        },
      });

      await this.prisma.modification.createMany({
        data: modification.options.map((modificationOptionItem) => ({
          name: modificationOptionItem.name,
          price: modificationOptionItem.price,
          modificationGroupId: modificationItem.id,
        })),
        skipDuplicates: true,
      });
    }
    return await this.prisma.menuItem.findUnique({
      where: {
        id: this.menuId,
      },
    });
  }

  async uploadMenuItemImage(image: Express.Multer.File, currentUser: AuthUser) {
    const restaurant =
      await this.restaurantService.getRestaurantByOwnerId(currentUser);

    const imageExtension = this.getMimeTypeExtension(image.mimetype);
    const imageSlug = `restaurants/${restaurant.id}/menu/${uuidv4()}.${imageExtension}`;

    await this.s3Client.send(
      new PutObjectCommand({
        ACL: 'public-read',
        Bucket: this.configService.get('AWS_S3_BUCKET'),
        Key: imageSlug,
        Body: image.buffer,
      }),
    );
    const originalPath = `https://tapeat-dev-bucket.object.pscloud.io/tapeat-dev-bucket/${imageSlug}`;
    await this.prisma.menuItemImage.create({
      data: {
        originalPath,
      },
    });

    this.menuItemImage = await this.prisma.menuItemImage.create({
      data: {
        originalPath,
      },
    });
    return 'Image created';
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
