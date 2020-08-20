import { Controller, Post, HttpCode, Get, 
  Body, UseGuards, Query, Patch, Param, Delete, UseInterceptors,Headers,
  UploadedFile, 
  Req} from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() user: User): Promise<any> {
    return this.userService.register(user);
  }

  
  @UseGuards(JwtAuthGuard)
  @Get('getUserInfo/:username')
  async getUserInfo(user: User): Promise<any> {
    console.log('userInfo:', user);
    return this.userService.findUser(!!user ? user.username : '');
  }
}