import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DetailPageService } from './detail-page.service';
import { CreateDetailPageDto } from './dto/create-detail-page.dto';
import { UpdateDetailPageDto } from './dto/update-detail-page.dto';
import { Board } from 'src/board/entities/board.entity';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("상세페이지 API")
@Controller('board/:category')
export class DetailPageController {
  constructor(private readonly detailPageService: DetailPageService) {}

  @Post()
  create(@Body() createDetailPageDto: CreateDetailPageDto) {
    return this.detailPageService.create(createDetailPageDto);
  }

  @Get(":id/see")
  @ApiOperation({summary : "상세 게시물 조회"})
  @ApiResponse({status: 201, description : "게시물 조회 완료", type : Board})
  async getDetailPage(
    @Param("category") category: string,
    @Query("id") id: string
  ): Promise<Board> {
    const parsedId = Number(id);
    return this.detailPageService.getContent(parsedId, category);
  }


  @Patch(':id/postUpdate')
  @ApiOperation({summary: "게시물 수정"})
  @ApiResponse({status:201, description: "게시물 수정 완료"})
  @ApiBody({type: UpdateDetailPageDto})
  update(@Param('id') id: string, @Body() updateDetailPageDto: Partial<UpdateDetailPageDto>) {
    return this.detailPageService.update(+id, updateDetailPageDto);
  }


  @Delete(':id/postDelete')
  @ApiOperation({summary : "게시물 삭제"})
  remove(@Param('id') id: string) {
    return this.detailPageService.softRemove(+id);
  }
}
