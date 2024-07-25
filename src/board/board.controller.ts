import { Controller, Get, Post, Body, Param, Query, Res, InternalServerErrorException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Board } from './entities/board.entity';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multer.config';

@ApiTags("게시판 API")
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 게시물 생성 컨트롤러
  @Post(':category/postCreate')
  @UseInterceptors(FileInterceptor('boardFile', multerOptions))
  @ApiOperation({summary : "게시물 생성"})
  @ApiResponse({status: 201, description: "게시물 생성 성공", type: Board})
  @ApiBody({type: CreateBoardDto})
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @UploadedFile() file : Express.Multer.File,
    @Param('category') category:string,
    @Res() res : Response,
    ) : Promise<Response> {
    try {
      if(file) {
        createBoardDto.boardFile = file.path;
      }
      await this.boardService.create(createBoardDto, category);
      return res.status(201).json({message: "게시물 생성 성공!", category})
    } catch (err) {
      if(err.message === "ForeignKeyConstraintError") {
        return res.status(400).json({error : "외래키 오류"})
      }
      return res.status(400).json({error : err.message});
    }
  }

  // 카테고리 게시물 조회 컨트롤러

  @Get()
  @ApiOperation({summary: "전체 게시판 조회"})
  @ApiResponse({status: 200, description: "게시물 조회 성공", type: [Board]})
  async findAll(  
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
    @Res() res : Response
  ): Promise<Response> {
    let parsedLimit : number = Number(limit);
    let parsedOffset : number = Number(offset);
    try {
      const postList = this.boardService.findAll(parsedLimit, parsedOffset);
      return res.status(200).json({message: "전체 게시물 조회 성공", postList})
    } catch (err) {
      throw new InternalServerErrorException (err.message);
    }
  }

  
  @Get(':category')
  @ApiOperation({summary: "게시판 조회"})
  @ApiResponse({status: 200, description: "게시물 조회 성공", type: [Board]})
  async findCategory(  
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
    @Param('category') category: string,
    @Res() res: Response,
  ): Promise<Response> {
    let parsedLimit : number = Number(limit);
    let parsedOffset : number = Number(offset);
    try {
      const specifiedPost = this.boardService.findAll(parsedLimit, parsedOffset, category);
      return res.status(200).json({message: "특정 게시물 조회 성공", specifiedPost});
    } catch (err) {
      throw new InternalServerErrorException (err.message);
    }
  }

}
