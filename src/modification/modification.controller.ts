import { Body, Controller, Post } from '@nestjs/common';
import { AuthUser, GetCurrentUser } from 'src/common/decorators';
import { CreateModificationGroupDto } from './dto/create-modification-group';
import { ModificationService } from './modification.service';

@Controller('modification')
export class ModificationController {
  constructor(private modificationService: ModificationService) {}

  @Post('create')
  createModificationGroup(
    @Body() dto: CreateModificationGroupDto,
    @GetCurrentUser() user: AuthUser,
  ) {
    return this.modificationService.createModificationGroup(dto, user);
  }
}
