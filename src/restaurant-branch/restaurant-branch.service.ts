import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators';
import { CreateBranchDto } from './dto/create-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantBranchMapper } from './restaurant-branch.mapper';

@Injectable()
export class RestaurantBranchService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateBranchDto, user: AuthUser) {
    const restaurantBranch = await this.prisma.restaurantBranch.create({
      data: {
        address: dto.address,
        longitude: dto.longitude,
        latitude: dto.latitude,
        restaurantId: user.restaurantId,
      },
    });
    return RestaurantBranchMapper.toDto(restaurantBranch);
  }

  async delete(body) {
    const branch = await this.prisma.restaurantBranch.delete({
      where: { id: body.branchId },
    });
    return branch;
  }

  async getBranches(user: AuthUser) {
    const branches = await this.prisma.restaurantBranch.findMany({
      where: { restaurantId: user.restaurantId },
    });
    return branches;
  }
}
