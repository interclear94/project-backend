import { Res,Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto,@Res()res:Response) {
    const user= await this.authService.validateUser(loginUserDto.uid, loginUserDto.upw);
    if(!user){
      throw new UnauthorizedException("아이디 존재X");
    }
    const token = this.authService.login(user);
    const date= new Date();
    date.setMinutes(date.getMinutes()+60);
    res.cookie("token",token,{httpOnly:true,expires:date})
    return res.redirect(`http://www.naver.com`);  
    // return this.authService.login(user);
  }
}
