import { FaqService } from './faq.service';
import { IFaqDto } from './dto/faq.dto';
export declare class FaqController {
    private readonly faqService;
    constructor(faqService: FaqService);
    create(faqTitle: string, faqContent: string): Promise<import("./entity/faq.entity").FaqBoard>;
    queryFind(q: string): Promise<IFaqDto[]>;
    findAll(): Promise<IFaqDto[]>;
    modifyFindOne(id: number): Promise<import("./entity/faq.entity").FaqBoard>;
    update(id: number, faqTitle: string, faqContent: string): Promise<[affectedCount: number]>;
    delete(id: number): Promise<number>;
}
