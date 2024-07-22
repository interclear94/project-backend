import { Controller, Get, Post, Body, Patch, Param, Delete, Query, InternalServerErrorException, Res } from '@nestjs/common';
import { DetailPageService } from './detail-page.service';
import { UpdateDetailPageDto } from './dto/update-detail-page.dto';
import { Board } from 'src/board/entities/board.entity';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("상세페이지 API")
@Controller('board/:category')
export class DetailPageController {
  constructor(private readonly detailPageService: DetailPageService) {}

  // @Post()
  // create(@Body() createDetailPageDto: CreateDetailPageDto) {
  //   return this.detailPageService.create(createDetailPageDto);
  // }

  @Get(":ix")
  @ApiOperation({summary : "상세 게시물 조회"})
  @ApiResponse({status: 201, description : "게시물 조회 완료", type : Board})
  async getDetailPage(
    @Param("category") category: string,
    @Query("id") id: string
  ): Promise<Board> {
    const parsedId = Number(id);
    try {
      return this.detailPageService.getContent(parsedId, category);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }


  @Patch(':id/postUpdate')
  @ApiOperation({summary: "게시물 수정"})
  @ApiResponse({status:201, description: "게시물 수정 완료"})
  @ApiBody({type: UpdateDetailPageDto})
  async update(
    @Param('category') category : string,
    @Query('id') id: string,
    @Body() updateDetailPageDto: Partial<UpdateDetailPageDto>,
    @Res() res : Response
  ): Promise<Response> {
    try{
      await this.detailPageService.update(+id, updateDetailPageDto);
      return res.status(200).json({message: "게시물 수정 완료", id, category});
    } catch(err) {
      throw new InternalServerErrorException(err.message);
    }
  }


  @Delete(':id/postDelete')
  @ApiOperation({summary : "게시물 삭제"})
  async remove(
    @Query('id') id: string,
    @Param('category') category: string,
    @Res()res : Response
  ) : Promise<Response> {
    try {
      await this.detailPageService.softRemove(+id);
      return res.status(200).json({message: "게시물 삭제 완료", category});
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }
}
