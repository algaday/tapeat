/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Unit } from 'src/constants/enums/unit.enum';
import { RepositoryBase } from 'src/core/domain/repository.base';
import {
  Paginated,
  PaginatedQueryParams,
} from 'src/core/domain/repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegramChatMapper } from 'src/telegram-chat/application/mappers/telegram-chat.mapper';
import { TelegramChatRepositoryPort } from 'src/telegram-chat/domain/telegram-chat-repository.port';
import { TelegramChatEntity } from 'src/telegram-chat/domain/telegram-chat.entity';

const TelegramChatPrismaValidator =
  Prisma.validator<Prisma.TelegramChatDefaultArgs>()({});

export type TelegramChatDbRecord = Prisma.TelegramChatGetPayload<
  typeof TelegramChatPrismaValidator
>;

@Injectable()
export class PrismaTelegramChatRepositoryAdapter
  extends RepositoryBase<TelegramChatEntity>
  implements TelegramChatRepositoryPort
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: TelegramChatMapper,
  ) {
    super(prisma);
  }
  async findByRestaurantBranchId(
    restaurantBranchId: string,
  ): Promise<TelegramChatEntity | null> {
    const telegramChat = await this.prisma.telegramChat.findFirst({
      ...TelegramChatPrismaValidator,
      where: { restaurantBranchId },
    });

    return telegramChat && this.mapper.toDomain(telegramChat);
  }

  async create(entity: TelegramChatEntity): Promise<void> {
    await this.prisma.telegramChat.create({
      data: this.mapper.toPersistence(entity),
    });
  }

  async findById(id: string): Promise<TelegramChatEntity | null> {
    const telegramChat = await this.prisma.telegramChat.findUnique({
      ...TelegramChatPrismaValidator,
      where: { id },
    });

    return telegramChat && this.mapper.toDomain(telegramChat);
  }

  async update(entity: TelegramChatEntity): Promise<void> {
    await this.prisma.telegramChat.update({
      data: this.mapper.toPersistence(entity),
      where: {
        id: entity.getId(),
      },
    });
  }

  delete(entity: TelegramChatEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<TelegramChatEntity[]> {
    throw new Error('Method not implemented.');
  }

  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<TelegramChatEntity>> {
    throw new Error('Method not implemented.');
  }
}
