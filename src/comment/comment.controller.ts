import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Reply } from './entities/comment.entity';

@Controller('board/:category')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':id')
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('category') category : string,
    @Query('id') id : string,
    @Body('parentId') parentId?: number,
    ): Promise<Reply> {
    const boardId = Number(id);
    return this.commentService.create(createCommentDto, category, boardId, parentId);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
