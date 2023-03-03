import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-threshold.dto';
import {MaxSpO2, MinSpO2} from 'domain/constants/thresholds.const';

export class UpdateOxygenSaturationView extends MinThresholdDto {
    @ApiProperty({minimum: MinSpO2, maximum: MaxSpO2})
    @IsNotEmpty()
    @Min(MinSpO2)
    @Max(MaxSpO2)
    public min: number;
}
