import {Res, Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards, Request, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/AuthGuard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multer.config';

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
  async getProfile(@Request() req) {
    const user = await this.usersService.verifyToken(req.cookies.token);
    console.log(user)
    const users = await this.usersService.getUserById(user);
    return users;
  }

  @Get('modify')
  async getProfileModify(@Request() req) {
    const user = await this.usersService.verifyToken(req.cookies.token);
    console.log(user)
    const users = await this.usersService.getUserById(user);
    return users;
  }


  @Post('modify')
  @UseInterceptors(FileInterceptor('profile', multerOptions))
  async updateUser(
    @UploadedFile() file:Express.Multer.File,
    @Req() req,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const user = await this.usersService.verifyToken(req.cookies.token);
    const userId = user.username;
    
    if (file) {
      const filePath = '/img/' + file.filename;
      updateUserDto.uprofile = filePath;
    }

    return this.usersService.update(userId, updateUserDto);
  }
}
