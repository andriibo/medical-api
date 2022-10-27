import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';

export class UpdateHeartRateView extends MinMaxThresholdDto {
    @ApiProperty()
    @IsNotEmpty()
    @Min(0)
    @Max(99)
    public min: number;

    @ApiProperty()
    @IsNotEmpty()
    @Min(100)
    @Max(199)
    public max: number;
}
