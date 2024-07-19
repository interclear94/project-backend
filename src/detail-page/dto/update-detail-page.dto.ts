import { PartialType } from '@nestjs/swagger';
import { CreateDetailPageDto } from './create-detail-page.dto';

export class UpdateDetailPageDto extends PartialType(CreateDetailPageDto) {}
