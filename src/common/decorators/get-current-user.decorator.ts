import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type UserInfo = {
  id: number;
  email: string;
};

export const GetCurrentUser = createParamDecorator(
  (_: undefined, context: ExecutionContext): UserInfo => {
    const request = context.switchToHttp().getRequest();
    const userInfo = { id: request.user.sub, email: request.user.email };
    return userInfo;
  },
);
