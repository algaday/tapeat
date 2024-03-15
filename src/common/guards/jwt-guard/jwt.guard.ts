import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  // If you want to use @Public decorator
  // canActivate(context: ExecutionContext) {
  //   const isPublic = this.reflector.getAllAndOverride('isPublic', [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);

  //   if (isPublic) return true;

  //   return super.canActivate(context);
  // }
}
