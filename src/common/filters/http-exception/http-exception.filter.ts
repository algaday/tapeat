import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { ApplicationError } from 'src/errors';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
      });
    }
    if (exception instanceof ApplicationError) {
      const status = 400;

      return response.status(status).json({
        statusCode: status,
        message: String(exception),
        timestamp: new Date().toISOString(),
      });
    }
    return response.status(500).json({
      statusCode: 500,
      exception,
      timestamp: new Date().toISOString(),
    });
  }
}
