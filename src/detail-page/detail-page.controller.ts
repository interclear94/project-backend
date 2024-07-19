import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DetailPageService } from './detail-page.service';
import { CreateDetailPageDto } from './dto/create-detail-page.dto';
import { UpdateDetailPageDto } from './dto/update-detail-page.dto';
import { Board } from 'src/board/entities/board.entity';

@Controller('board')
export class DetailPageController {
  constructor(private readonly detailPageService: DetailPageService) {}

  @Post()
  create(@Body() createDetailPageDto: CreateDetailPageDto) {
    return this.detailPageService.create(createDetailPageDto);
  }

  @Get(":category")
  async getDetailPage(
    @Param("free") category: string,
    @Query("id") id: number
  ): Promise<Board> {
    return this.detailPageService.getContent(id, category);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailPageDto: UpdateDetailPageDto) {
    return this.detailPageService.update(+id, updateDetailPageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailPageService.remove(+id);
  }
}
