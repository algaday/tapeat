import { Injectable } from '@nestjs/common';
import { CreateModificationGroupDto } from './dto/create-modification-group.dto';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModificationMapper } from './modification.mapper';
import { DeleteModificationGroupDto } from './dto/delete-modification.dto';

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

  getModificationGroup(params: { id: string }) {
    const modificationGroup = this.prisma.modificationGroup.findUnique({
      where: {
        id: params.id,
      },
      include: {
        modifications: true,
      },
    });

    return modificationGroup;
  }

  async deleteModificationGroup(dto: DeleteModificationGroupDto) {
    const deletedModificationGroup = await this.prisma.modificationGroup.delete(
      {
        where: { id: dto.id },
      },
    );

    return deletedModificationGroup;
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
