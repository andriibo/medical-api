import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-threshold.dto';

export class UpdateOxygenSaturationView extends MinThresholdDto {
    @ApiProperty()
    @IsNotEmpty()
    @Min(70)
    @Max(100)
    public min: number;
}
