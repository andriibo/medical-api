import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-threshold.dto';
import {MinSpO2} from 'app/modules/patient-vital-thresholds/templates/default-thresholds.template';

export class UpdateOxygenSaturationView extends MinThresholdDto {
    @ApiProperty({minimum: MinSpO2.value, maximum: 100})
    @IsNotEmpty()
    @Min(MinSpO2.value)
    @Max(100)
    public min: number;
}
