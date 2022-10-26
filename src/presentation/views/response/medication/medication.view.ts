import {ApiProperty} from '@nestjs/swagger';
import {MedicationDto} from 'domain/dtos/response/medication/medication.dto';

export class MedicationView implements MedicationDto {
    @ApiProperty()
    public genericName: string;

    @ApiProperty()
    public brandNames: string[];
}
