import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, BadRequestException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Reply } from './entities/comment.entity';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("댓글 API")
@Controller('board/:category')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  
  @Post(':id/replyCreate')
  @ApiOperation({summary : "댓글 작성"})
  @ApiResponse({status: 201, description: "댓글 생성 성공"})
  @ApiBody({type: CreateCommentDto})
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

  // 댓글 불러오기
  @Get(':id')
  @ApiOperation({summary : "댓글 조회"})
  @ApiResponse({status: 200, description: "댓글 조회 성공", type: [Reply]})
  async findAll(
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
    @Query('id') id: string,
    @Param('category') category : string
  ) : Promise<Reply[]> {
    const boardId = Number(id);
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset)
    return this.commentService.findAll(boardId, category, parsedLimit, parsedOffset);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id/replyUpdate')
  @ApiOperation({summary : "댓글 수정"})
  @ApiResponse({status :201, description: "댓글 수정 성공", type: [Reply]})
  @ApiBody({type : UpdateCommentDto})
  update(
    @Query('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    const boardId = Number(id);
    return this.commentService.update(boardId, updateCommentDto);
  }

  @Delete(':id/replyDelete')
  @ApiOperation({summary : "댓글 삭제"})
  @ApiResponse({status:201, description: "댓글 삭제 완료"})
  remove(@Param('id') id: string) {
    return this.commentService.softRemove(+id);
  }
}
