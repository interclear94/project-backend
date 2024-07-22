import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DetailPageService } from './detail-page.service';
import { CreateDetailPageDto } from './dto/create-detail-page.dto';
import { UpdateDetailPageDto } from './dto/update-detail-page.dto';
import { Board } from 'src/board/entities/board.entity';

@Controller('board/:category')
export class DetailPageController {
  constructor(private readonly detailPageService: DetailPageService) {}

  @Post()
  create(@Body() createDetailPageDto: CreateDetailPageDto) {
    return this.detailPageService.create(createDetailPageDto);
  }

  @Get(":id")
  async getDetailPage(
    @Param("category") category: string,
    @Query("id") id: string
  ): Promise<Board> {
    const parsedId = Number(id);
    return this.detailPageService.getContent(parsedId, category);
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
