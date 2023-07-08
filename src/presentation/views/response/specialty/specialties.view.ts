import {ApiProperty} from '@nestjs/swagger';
import {SpecialtiesDto} from 'domain/dtos/response/specialty/specialties.dto';

export class SpecialtiesView implements SpecialtiesDto {
    @ApiProperty({isArray: true, type: [String]})
    public specialtyNames: string[];
}
