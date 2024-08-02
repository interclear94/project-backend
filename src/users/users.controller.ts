import {Res, Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CreationAttributes } from 'sequelize';

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
    // const {uid, unickname, uemail, uphone} = createUserDto;
    // const user = await this.usersService.createUser(uid,unickname,uemail,uphone);
    // if(!user){
    //   throw new UnauthorizedException('회원가입 실패');

    // }

    // return {message:'회원가입 성공', user}
  }

  // @Post('login')
  // @ApiOperation({ summary: 'Register a new user' })
  // @ApiResponse({ status: 201, description: 'The user has been successfully login.' })
  // @ApiResponse({ status: 400, description: 'Bad request.' })
  // async login(@Body() loginUserDto: LoginUserDto,@Res() res:Response) {
  //   const {uid, upw} = loginUserDto;
  //   const user = await this.usersService.loginUser(uid,upw);
  //   if(!user) {
  //     throw new UnauthorizedException('로그인 실패');
  //   }
    
  //   return {message: '로그인 성공', user}
    
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Param('id')id:CreateUserDto ,@Request() req) {
    return req.id;
  }
}
