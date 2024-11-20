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
import { NotificationSubscriptionCodeMapper } from 'src/notification-subscription-code/application/mappers/notification-subscription-code.mapper';
import { NotificationSubscriptionCodeRepositoryPort } from 'src/notification-subscription-code/domain/notification-subscription-code-repository.port';
import { NotificationSubscriptionCodeEntity } from 'src/notification-subscription-code/domain/notification-subscription.entity';
import { PrismaService } from 'src/prisma/prisma.service';

const NotificationSubscriptionCodePrismaValidator =
  Prisma.validator<Prisma.NotificationSubscriptionCodeDefaultArgs>()({});

export type NotificationSubscriptionCodeDbRecord =
  Prisma.NotificationSubscriptionCodeGetPayload<
    typeof NotificationSubscriptionCodePrismaValidator
  >;

@Injectable()
export class PrismaNotificationSubscriptionCodeRepositoryAdapter
  extends RepositoryBase<NotificationSubscriptionCodeEntity>
  implements NotificationSubscriptionCodeRepositoryPort
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: NotificationSubscriptionCodeMapper,
  ) {
    super(prisma);
  }

  async findBySecretCode(
    secretCode: string,
  ): Promise<NotificationSubscriptionCodeEntity | null> {
    const notificationSubscriptionCode =
      await this.prisma.notificationSubscriptionCode.findFirst({
        ...NotificationSubscriptionCodePrismaValidator,
        where: { secretCode },
      });

    return (
      notificationSubscriptionCode &&
      this.mapper.toDomain(notificationSubscriptionCode)
    );
  }

  async create(entity: NotificationSubscriptionCodeEntity): Promise<void> {
    await this.prisma.notificationSubscriptionCode.create({
      data: this.mapper.toPersistence(entity),
    });
  }

  async findById(
    id: string,
  ): Promise<NotificationSubscriptionCodeEntity | null> {
    const notificationSubscriptionCode =
      await this.prisma.notificationSubscriptionCode.findUnique({
        ...NotificationSubscriptionCodePrismaValidator,
        where: { id },
      });

    return (
      notificationSubscriptionCode &&
      this.mapper.toDomain(notificationSubscriptionCode)
    );
  }

  async update(entity: NotificationSubscriptionCodeEntity): Promise<void> {
    await this.prisma.notificationSubscriptionCode.update({
      data: this.mapper.toPersistence(entity),
      where: {
        id: entity.getId(),
      },
    });
  }

  delete(entity: NotificationSubscriptionCodeEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<NotificationSubscriptionCodeEntity[]> {
    throw new Error('Method not implemented.');
  }

  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<NotificationSubscriptionCodeEntity>> {
    throw new Error('Method not implemented.');
  }
}
