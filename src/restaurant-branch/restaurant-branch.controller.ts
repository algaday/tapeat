import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RestaurantBranchService } from './restaurant-branch.service';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { AuthUser, GetCurrentUser } from 'src/common/decorators';
import { CreateBranchDto } from './dto/create-branch.dto';

@UseGuards(JwtGuard)
@Controller('restaurant-branch')
export class RestaurantBranchController {
  constructor(private restaurantBranchService: RestaurantBranchService) {}
  @Post('create')
  createBranch(@Body() dto: CreateBranchDto, @GetCurrentUser() user: AuthUser) {
    return this.restaurantBranchService.createBranch(dto, user);
  }
}
