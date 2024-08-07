import { DetailPageService } from './detail-page.service';
import { UpdateDetailPageDto } from './dto/update-detail-page.dto';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
export declare class DetailPageController {
    private readonly detailPageService;
    private readonly userService;
    constructor(detailPageService: DetailPageService, userService: UsersService);
    getDetailPage(category: string, id: string, limit: string, offset: string, res: Response): Promise<Response>;
    update(category: string, id: string, updateDetailPageDto: UpdateDetailPageDto, file: Express.Multer.File, res: Response, req: Request): Promise<Response>;
    remove(id: string, category: string, res: Response, req: Request): Promise<Response>;
}
