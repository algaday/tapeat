import { Injectable } from '@nestjs/common';
import { CreateStorageBodyDto } from './dto';
import { StorageRepository } from './storage.repository';

@Injectable()
export class StorageService {
  constructor(private readonly storageRepository: StorageRepository) {}

  async createStorage(data: CreateStorageBodyDto) {
    return this.storageRepository.createOne(data);
  }

  async createStorages(data: CreateStorageBodyDto[]) {
    return this.storageRepository.createMany(data);
  }

  async getStorage(id: string) {
    return this.storageRepository.findById(id);
  }

  async getStorages() {
    return this.storageRepository.findAll();
  }

  async deleteStorage(id: string) {
    return this.storageRepository.delete(id);
  }

  async updateStorage(id: string, data: CreateStorageBodyDto) {
    return this.storageRepository.update(id, data);
  }
}
