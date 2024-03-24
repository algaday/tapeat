import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3Client = new S3Client({
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
    },
    endpoint: this.configService.get('AWS_HOST'),
    forcePathStyle: true,
    region: this.configService.get('AWS_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadFile(path: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        ACL: 'public-read',
        Bucket: this.configService.get('AWS_S3_BUCKET'),
        Key: path,
        Body: file,
      }),
    );
  }
}
