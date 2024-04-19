import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser, GetCurrentUser } from 'src/common/decorators';
import { CreateModificationGroupDto } from './dto/create-modification-group.dto';
import { ModificationService } from './modification.service';
import { JwtGuard } from 'src/common/guards/jwt-guard';

@UseGuards(JwtGuard)
@Controller('modification')
export class ModificationController {
  constructor(private modificationService: ModificationService) {}

  @Get('all')
  getModificationGroups(@GetCurrentUser() user: AuthUser) {
    return this.modificationService.getModificationGroups(user);
  }

  @Post('create')
  createModificationGroup(
    @Body() dto: CreateModificationGroupDto,
    @GetCurrentUser() user: AuthUser,
  ) {
    return this.modificationService.createModificationGroup(dto, user);
  }
}
