import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt'
import { Repository } from 'sequelize-typescript';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'sequelize';
import { User } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ){}

  private readonly saltRounds = 10;

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto.uid);
    
    const {uid, upw, unickname, uemail, uphone} = createUserDto
    console.log('생성 완료')
    const hashPw = await bcrypt.hash(upw.toString(), 10)
    
    return this.userModel.create({uid, upw : hashPw, unickname, uemail, uphone});
  }

  // async createUser(uid: string, unickname:string, uemail:string, uphone:number): Promise<{uid: string,upw:string, unickname:string, uemail:string, uphone:number}>{
  //   const userid = await this.userModel.findOne({where: {uid}});
  //   const usernick = await this.userModel.findOne({where: {unickname}});
  //   const useremail = await this.userModel.findOne({where: {uemail}});
  //   const userphone = await this.userModel.findOne({where: {uphone}});

  //   if(userid){
  //     throw new UnauthorizedException('아이디 중복')
  //   }

  //   if(usernick){
  //     throw new UnauthorizedException('닉네임 중복')
  //   }

  //   if(useremail){
  //     throw new UnauthorizedException('이메일 중복')
  //   }

  //   if(userphone){
  //     throw new UnauthorizedException('휴대폰 중복')
  //   }

  //   console.log('회원가입 성공')
  //   return {uid: userid.uid, upw: userid.upw, unickname:userid.unickname, uemail:userid.uemail, uphone:userid.uphone}
  // }

  // async loginUser(uid: string, upw:string): Promise<{uid : string, unickname: string}> {
  //   const user = await this.userModel.findOne({where: {uid}});
  //   const pwMatch = await bcrypt.compare(upw, user.upw);
  //   if(!user){
  //     console.error('아이디가 없습니다.')
  //     throw new UnauthorizedException('아이디 없음')  
  //   }
    
  //   if(!pwMatch){
  //     console.error('비밀번호 틀림')
  //     throw new UnauthorizedException('비밀번호 틀림')
  //   }
  //   console.log('로그인성공')
  //   return {uid: user.uid, unickname: user.unickname}
  // }

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const { uid, upw } = loginUserDto;
    const user = await this.userModel.findOne({ where: { uid } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(upw, user.upw);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  } 

  async getUserById(userdata: any ): Promise<User> {
    const uid = userdata.username
    return await this.userModel.findOne({ where: {uid} });
  }
  

  async verifyToken(token: string) {
    try {
      const reuslt = this.jwtService.verify(token, {
        secret: process.env.Jwt_Key, // 비밀 키를 환경 변수에서 가져옵니다.
      }); // JWT 검증
      return reuslt;

    } catch (error) {
      console.log("오류로 빠지는지 확인")
        console.log(error)
        throw new UnauthorizedException('유효하지 않은 토큰');
    }
}

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
