import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, InternalServerErrorException } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Board } from './entities/board.entity';
import { Response } from 'express';

@ApiTags("게시판 API")
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post(':category/postCreate')
  @ApiOperation({summary : "게시물 생성"})
  @ApiResponse({status: 201, description: "게시물 생성 성공", type: Board})
  @ApiBody({type: CreateBoardDto})
  async create(@Body() createBoardDto: CreateBoardDto, @Param('category') category:string, @Res() res : Response) : Promise<Response> {
    try {
      await this.boardService.create(createBoardDto, category);
      return res.status(201).json({message: "게시물 생성 성공!", category})
    } catch (err) {
      if(err.message === "ForeignKeyConstraintError") {
        return res.status(400).json({error : "외래키 오류"})
      }
      return res.status(400).json({error : err.message});
    }
  }

  @Get(':category')
  @ApiOperation({summary: "게시판 조회"})
  @ApiResponse({status: 200, description: "게시물 조회 성공", type: [Board]})
  async findAll(  
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
    @Param('category') category: string
  ): Promise<Board[]> {
    let parsedLimit : number = Number(limit);
    let parsedOffset : number = Number(offset);
    try {
      return this.boardService.findAll(parsedLimit, parsedOffset, category);
    } catch (err) {
      throw new InternalServerErrorException (err.message);
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
  //   return this.boardService.update(+id, updateBoardDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.boardService.remove(+id);
  // }
}
