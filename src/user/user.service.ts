import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  createUser(dto: User) {
    return 'ji';
  }
}
