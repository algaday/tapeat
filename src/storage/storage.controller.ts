import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStorageBodyDto } from './dto';
import { StorageService } from './storage.service';

@Controller('storages')
export class StorageController {
  constructor(private storageService: StorageService) {}
  @Post()
  async create(@Body() data: CreateStorageBodyDto) {
    return this.storageService.create(data);
  }

  @Post('bulk')
  async createMany(@Body() data: CreateStorageBodyDto[]) {
    return this.storageService.createMany(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.storageService.delete(id);
  }

  @Put(':id')
  async update(@Param() id: string, @Body() data: CreateStorageBodyDto) {
    return this.storageService.update(id, data);
  }

  @Get()
  async getAll() {
    return this.storageService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.storageService.findById(id);
  }
}
