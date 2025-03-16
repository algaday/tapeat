import { Module } from '@nestjs/common';
import { PrismaNotificationSubscriptionCodeRepositoryAdapter } from '../repository/prisma-notification-subscription-code-repository.adapter';
import { NotificationSubscriptionCodeRepositoryPort } from 'src/notification-subscription-code/domain/notification-subscription-code-repository.port';
import { NotificationSubscriptionCodeMapper } from 'src/notification-subscription-code/application/mappers/notification-subscription-code.mapper';
import { NotificationSubscriptionCodeApplicationService } from 'src/notification-subscription-code/application/services/notification-subscription-code.application-service';

const REPOSITORIES = [
  {
    provide: NotificationSubscriptionCodeRepositoryPort,
    useClass: PrismaNotificationSubscriptionCodeRepositoryAdapter,
  },
];

@Module({
  controllers: [],
  providers: [
    NotificationSubscriptionCodeMapper,
    NotificationSubscriptionCodeApplicationService,
    ...REPOSITORIES,
  ],
  exports: [...REPOSITORIES, NotificationSubscriptionCodeApplicationService],
})
export class NotificationSubscriptionCodeModule {}
