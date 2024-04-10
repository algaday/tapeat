import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApplicationError } from 'src/errors';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();

    if (exception instanceof ApplicationError) {
      const status = 400;

      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      });
    }

    return response.status(status).json({
      statusCode: status,
      message: exception,
      timestamp: new Date().toISOString(),
    });
  }
}
