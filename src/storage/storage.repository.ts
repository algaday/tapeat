import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStorageBodyDto } from './dto';

@Injectable()
export class StorageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOne(data: CreateStorageBodyDto) {
    return this.prismaService.storage.create({ data });
  }

  async createMany(data: CreateStorageBodyDto[]) {
    return this.prismaService.storage.createMany({ data });
  }

  async findById(id: string) {
    return this.prismaService.storage.findFirst({ where: { id } });
  }

  async findAll() {
    return this.prismaService.storage.findMany();
  }

  async update(id: string, data: CreateStorageBodyDto) {
    return this.prismaService.storage.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prismaService.storage.delete({ where: { id } });
  }
}
