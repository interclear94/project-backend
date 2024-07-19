import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { CreateSignUpDto } from './dto/create-sign-up.dto';
import { UpdateSignUpDto } from './dto/update-sign-up.dto';

@Controller('sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post()
  create(@Body() createSignUpDto: CreateSignUpDto) {
    return this.signUpService.create(createSignUpDto);
  }

  @Get()
  findAll() {
    return this.signUpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signUpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignUpDto: UpdateSignUpDto) {
    return this.signUpService.update(+id, updateSignUpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signUpService.remove(+id);
  }
}
