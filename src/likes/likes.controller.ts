import { Controller, Get, Post, Body, Param, Query, Res, InternalServerErrorException } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("좋아요")
@Controller('board/:category')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // 좋아요!!
  @Post(":id/LikeUpdate")
  @ApiOperation({summary: "좋아요"})
  @ApiResponse({status: 200, description: "좋아요 업데이트 성공"})
  @ApiBody({type: CreateLikeDto})
  async likeToggle(
    @Body() createLikeDto : CreateLikeDto,
    @Param('category') category :string,
    @Query('id')id : string,
    @Res() res: Response,
  ) : Promise<Response> {
    const boardId = Number(id);
    const uid = createLikeDto.uid;
    try {
      const resultMessage : string = await this.likesService.updateLikeStatus(boardId, category, uid);
      return res.status(200).json({mesaage: resultMessage});
    } catch (err) {
      throw  new InternalServerErrorException(err.mesaage);
    }
  }

  // @Get()
  // findAll() {
  //   return this.likesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.likesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
  //   return this.likesService.update(+id, updateLikeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.likesService.remove(+id);
  // }
}
