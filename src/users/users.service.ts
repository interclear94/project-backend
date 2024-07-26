import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ){}

  private readonly saltRounds = 10;

  async create(createUserDto: CreateUserDto): Promise<User> {
    const {uid, upw, unickname, uemail,uphone} = createUserDto
    const hashPw = await this.hashPw(upw)
    
    console.log('생성 완료')
    return this.userModel.create({uid, upw : hashPw, unickname, uemail,uphone});
  }

  private async hashPw(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async loginUser(uid: string, upw:string): Promise<{uid : string, unickname: string}> {
    const user = await this.userModel.findOne({where: {uid}});
    const pwMatch = await bcrypt.compare(upw, user.upw);
    if(!user){
      console.error('아이디가 없습니다.')
      throw new UnauthorizedException('아이디 없음')  
    }
    
    if(!pwMatch){
      console.error('비밀번호 틀림')
      throw new UnauthorizedException('비밀번호 틀림')
    }
    console.log('로그인성공')
    return {uid: user.uid, unickname: user.unickname}
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


  

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
