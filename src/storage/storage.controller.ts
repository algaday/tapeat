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
  async createStorage(@Body() data: CreateStorageBodyDto) {
    return this.storageService.createStorage(data);
  }

  @Post('bulk')
  async createStorages(@Body() data: CreateStorageBodyDto[]) {
    return this.storageService.createStorages(data);
  }

  @Delete(':id')
  async deleteStorage(@Param('id') id: string) {
    return this.storageService.deleteStorage(id);
  }

  @Put(':id')
  async updateStorage(@Param() id: string, @Body() data: CreateStorageBodyDto) {
    return this.storageService.updateStorage(id, data);
  }

  @Get()
  async getStorages() {
    return this.storageService.getStorages();
  }

  @Get(':id')
  async getStorage(@Param('id') id: string) {
    return this.storageService.getStorage(id);
  }
}
