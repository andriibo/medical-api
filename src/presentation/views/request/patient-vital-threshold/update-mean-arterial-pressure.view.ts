import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';

export class UpdateMeanArterialPressureView extends MinMaxThresholdDto {
    @ApiProperty()
    @IsNotEmpty()
    @Min(40)
    @Max(90)
    public min: number;

    @ApiProperty()
    @IsNotEmpty()
    @Min(91)
    @Max(160)
    public max: number;
}
