import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
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

  @Get('branches')
  getBranches(@GetCurrentUser() user: AuthUser) {
    return this.restaurantBranchService.getBranches(user);
  }

  @Delete('branches')
  deleteBranch(@Body() body: { branchId: string }) {
    return this.restaurantBranchService.deleteBranch(body);
  }
}
