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
    
    console.log('??', uid)
    return await this.userModel.findOne({ where: {uid} });
  }
  

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token); // JWT 검증
    } catch (error) {
        throw new UnauthorizedException('유효하지 않은 토큰');
    }
}

async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
  const user = await this.userModel.findOne({ where: { uid: userId } });
  if (!user) {
    throw new NotFoundException(`아이디를 찾을수 없음.`);
  }

  if (updateUserDto.upw) {
    console.log('넘어옴')
    updateUserDto.upw = await bcrypt.hash(updateUserDto.upw.toString(), this.saltRounds);
  }

  await user.update(updateUserDto);
  return user;
}
}
