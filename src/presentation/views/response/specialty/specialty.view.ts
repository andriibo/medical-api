import {ApiProperty} from '@nestjs/swagger';
import {SpecialtyDto} from 'domain/dtos/response/specialty/specialty.dto';

export class SpecialtyView implements SpecialtyDto {
    @ApiProperty()
    public specialtyName: string;
}
