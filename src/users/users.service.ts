import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
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

async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
  const user = await this.userModel.findOne({ where: { uid: userId } });
  if (!user) {
    console.log('아이디 찾을수 없음')
    throw new NotFoundException(`아이디를 찾을수 없음.`);
  }

  if (updateUserDto.upw) {
    console.log('비밀번호 바뀜')
    updateUserDto.upw = await bcrypt.hash(updateUserDto.upw.toString(), this.saltRounds);
  }

  await user.update(updateUserDto);
  console.log('정보바뀜')
  return user;
  }
}

