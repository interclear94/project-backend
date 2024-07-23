import { Controller, Post, Body, Patch, Param, Delete, Query, Res, InternalServerErrorException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Reply } from './entities/comment.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
      await this.commentService.create(createCommentDto, category, boardId);
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
  // @Get(':id')
  // @ApiOperation({summary : "댓글 조회"})
  // @ApiResponse({status: 200, description: "댓글 조회 성공", type: [Reply]})
  // async findAll(
  //   @Query('limit') limit: string = '10',
  //   @Query('offset') offset: string = '0',
  //   @Query('id') id: string,
  //   @Param('category') category : string
  // ) : Promise<Reply[]> {
  //   const boardId = Number(id);
  //   const parsedLimit = Number(limit);
  //   const parsedOffset = Number(offset)
  //   try {
  //     return await this.commentService.findAll(boardId, category, parsedLimit, parsedOffset);
  //   } catch(err) {
  //     throw new InternalServerErrorException(err.message);
  //   }
  // }

  @Patch(':id/replyUpdate')
  @ApiOperation({summary : "댓글 수정"})
  @ApiResponse({status :201, description: "댓글 수정 성공", type: [Reply]})
  @ApiBody({type : UpdateCommentDto})
  async update(
    @Query('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Res() res: Response,
    @Param('categort') category : string,
  ) {
    const boardId = Number(id);
    try {
      await this.commentService.update(boardId, updateCommentDto);
      res.status(201).json({message: "게시물 수정 완료", boardId, category})
    } catch(err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Delete(':id/replyDelete')
  @ApiOperation({summary : "댓글 삭제"})
  @ApiResponse({status:201, description: "댓글 삭제 완료"})
  async remove(@Query('id') id: string, @Param('category') category : string, @Res() res: Response) : Promise<Response> {
    try {
      const parsedId = Number(id);
      await this.commentService.softRemove(parsedId);
      return res.status(200).json({message: "게시물 삭제 완료", parsedId, category})
    } catch(err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
