import { Injectable } from '@nestjs/common';
import { CreateModificationGroupDto } from './dto/create-modification-group.dto';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModificationMapper } from './modification.mapper';

@Injectable()
export class ModificationService {
  constructor(private prisma: PrismaService) {}

  async getModificationGroups(user: AuthUser) {
    const modificationGroups = await this.prisma.modificationGroup.findMany({
      where: {
        restaurantId: user.restaurantId,
      },
      include: {
        modifications: true,
      },
    });

    return modificationGroups.map((modificationGroup) =>
      ModificationMapper.toDto(modificationGroup),
    );
  }

  async createModificationGroup(
    modificationGroupDto: CreateModificationGroupDto,
    user: AuthUser,
  ) {
    const modificationGroup = await this.prisma.modificationGroup.create({
      data: {
        name: modificationGroupDto.modificationGroupName,
        restaurantId: user.restaurantId,
      },
    });

    await this.prisma.modification.createMany({
      data: modificationGroupDto.modifications.map((modification) => ({
        name: modification.name,
        price: modification.price,
        modificationGroupId: modificationGroup.id,
      })),
      skipDuplicates: true,
    });

    return modificationGroup;
  }
}
