import { FaqBoard } from './entity/faq.entity';
import { IFaqDto } from './dto/faq.dto';
export declare class FaqService {
    private readonly faqModel;
    constructor(faqModel: typeof FaqBoard);
    create(faqTitle: string, faqContent: string): Promise<FaqBoard>;
    findAll(): Promise<IFaqDto[]>;
    modifyFindOne(id: number): Promise<FaqBoard>;
    update(id: number, faqTitle: string, faqContent: string): Promise<[affectedCount: number]>;
    delete(id: number): Promise<number>;
    queryFind(keyword: string): Promise<FaqBoard[]>;
}
