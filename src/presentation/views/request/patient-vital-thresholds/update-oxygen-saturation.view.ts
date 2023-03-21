import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-threshold.dto';
import {AbsMaxSpO2, AbsMinSpO2} from 'domain/constants/vitals.const';

export class UpdateOxygenSaturationView extends MinThresholdDto {
    @ApiProperty({minimum: AbsMinSpO2, maximum: AbsMaxSpO2})
    @IsNotEmpty()
    @Min(AbsMinSpO2)
    @Max(AbsMaxSpO2)
    public min: number;
}
