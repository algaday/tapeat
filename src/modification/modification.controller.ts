import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthUser, GetCurrentUser } from 'src/common/decorators';
import { CreateModificationGroupDto } from './dto/create-modification-group.dto';
import { ModificationService } from './modification.service';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { DeleteModificationGroupDto } from './dto/delete-modification.dto';

@UseGuards(JwtGuard)
@Controller('modification')
export class ModificationController {
  constructor(private modificationService: ModificationService) {}

  @Get('all')
  getModificationGroups(@GetCurrentUser() user: AuthUser) {
    return this.modificationService.getModificationGroups(user);
  }

  @Get('/:id')
  getModificationGroup(@Param() params: { id: string }) {
    return this.modificationService.getModificationGroup(params);
  }

  @Post('create')
  createModificationGroup(
    @Body() dto: CreateModificationGroupDto,
    @GetCurrentUser() user: AuthUser,
  ) {
    return this.modificationService.createModificationGroup(dto, user);
  }

  @Delete('delete')
  deleteModificationGroup(@Body() dto: DeleteModificationGroupDto) {
    return this.modificationService.deleteModificationGroup(dto);
  }
}
