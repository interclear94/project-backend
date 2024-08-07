import {Res, Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/AuthGuard';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.usersService.create(createUserDto);
  }


  @Get('profile')
  async getProfile(@Req() req : Request) {
    const user = await this.usersService.verifyToken(req.cookies.token);
    const users = await this.usersService.getUserById(user);
    return users;
  }
}
