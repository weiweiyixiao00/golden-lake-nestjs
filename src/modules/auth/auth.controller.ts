import { Controller, Body, Post, UseGuards, Get, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../user/entity/user.entity";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Request } from "express";

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Body() user: User): Promise<any> {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUserInfo')
  public async getUserInfo(@Req() req: Request): Promise<any> {
    return this.authService.getUserInfo(req.headers.authorization);
  }
}