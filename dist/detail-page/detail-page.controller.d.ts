import { DetailPageService } from './detail-page.service';
import { UpdateDetailPageDto } from './dto/update-detail-page.dto';
import { Response } from 'express';
export declare class DetailPageController {
    private readonly detailPageService;
    constructor(detailPageService: DetailPageService);
    getDetailPage(category: string, id: string, limit: string, offset: string, res: Response): Promise<Response>;
    update(category: string, id: string, updateDetailPageDto: UpdateDetailPageDto, file: Express.Multer.File, res: Response): Promise<Response>;
    remove(id: string, category: string, res: Response): Promise<Response>;
}
