import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Board } from './entities/board.entity';

@ApiTags("게시판 API")
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiOperation({summary : "create new board"})
  @ApiResponse({status: 201, description: "게시물 생성 성공", type: Board})
  @ApiBody({type: CreateBoardDto})
  async create(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardService.create(createBoardDto);
  }

  @Get()
  async findAll(
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0'
  ): Promise<Board[]> {
    let parsedLimit : number = Number(limit);
    let parsedOffset : number = Number(offset);
    return this.boardService.findAll(parsedLimit, parsedOffset);
  }

  @Get('/free')
  async showFreeBoard(
    @Query('limit') limit: string = '10',
    @Query('offset') offset : string = '0'
  ) : Promise<Board[]> {
    let parsedLimit : number = Number(limit);
    let parsedOffset : number = Number(offset);
    return this.boardService.getCategoryContent('free', parsedLimit, parsedOffset);
  }

   @Get('/jmt')
  async showJmtBoard(
    @Query('limit') limit: string = '10',
    @Query('offset') offset : string = '0'
  ) : Promise<Board[]> {
    let parsedLimit : number = Number(limit);
    let parsedOffset : number = Number(offset);
    return this.boardService.getCategoryContent('jmt', parsedLimit, parsedOffset);
  }

  @Get('/review') 
  async showReviewBoard(
    @Query('limit') limit: string = '10',
    @Query('offset') offset : string = '0'
  ) : Promise<Board[]> {
    let parsedLimit : number = Number(limit);
    let parsedOffset : number = Number(offset);
    return this.boardService.getCategoryContent('review', parsedLimit, parsedOffset);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
