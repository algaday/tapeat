import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtendedPrismaClient } from '../../prisma/prisma-client';

@Injectable()
export class PrismaService extends ExtendedPrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
