import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type AuthUser = {
  id: string;
  email: string;
  restaurantId?: string;
};

export const GetCurrentUser = createParamDecorator(
  (_: undefined, context: ExecutionContext): AuthUser => {
    const request = context.switchToHttp().getRequest();
    const user = {
      id: request.user.sub,
      email: request.user.email,
      restaurantId: request.user.restaurantId,
    };
    return user;
  },
);
