import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, BadRequestException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Reply } from './entities/comment.entity';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("댓글 API")
@Controller('board/:category')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  
  @Post(':id/comment')
  @ApiOperation({summary : "댓글 작성"})
  @ApiResponse({status: 201, description: "댓글 생성 성공"})
  @ApiBody({type: CreateCommentDto})
  @ApiQuery({
    name: "id",
    type: String,
    description: "글 번호",
    example: "1"
  })
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('category') category : string,
    @Query('id') id : string,
    @Res() res: Response,
    ): Promise<Response> {
    try {
      const boardId = Number(id);
      this.commentService.create(createCommentDto, category, boardId);
      return res.status(201).json({message : "댓글 생성 성공", category, id})
    } catch (err) {
      console.log("comment.controller.ts -> create")
      if(err.message === "ForeignKeyConstraintError") {
        res.status(400).json({ error: '외래키 오류' });
      }
      res.status(400).json({error : err.message});
    }
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
