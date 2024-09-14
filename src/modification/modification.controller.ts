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
import { AddModificationDto } from './dto/update-modification-group.dto';
import { Prisma } from '@prisma/client';

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

  @Post('add')
  addModification(@Body() dto: AddModificationDto) {
    return this.modificationService.addModification(dto);
  }

  @Delete('delete')
  deleteModificationGroup(@Body() dto: DeleteModificationGroupDto) {
    return this.modificationService.deleteModificationGroup(dto);
  }

  @Delete('delete-modification')
  deleteModification(@Body() dto: DeleteModificationGroupDto) {
    return this.modificationService.deleteModification(dto);
  }

  @Post('update-modification-group')
  updateModificationGroup(
    @Body() dto: Prisma.ModificationGroupUncheckedCreateInput,
  ) {
    return this.modificationService.updateModificationGroup(dto.id, dto);
  }
}
