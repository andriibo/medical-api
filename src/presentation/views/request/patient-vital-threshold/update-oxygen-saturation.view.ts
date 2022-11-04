import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-threshold.dto';

export class UpdateOxygenSaturationView extends MinThresholdDto {
    @ApiProperty({minimum: 80, maximum: 100})
    @IsNotEmpty()
    @Min(80)
    @Max(100)
    public min: number;
}
