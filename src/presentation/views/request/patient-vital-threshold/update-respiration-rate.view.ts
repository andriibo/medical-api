import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';

export class UpdateRespirationRateView extends MinMaxThresholdDto {
    @ApiProperty()
    @IsNotEmpty()
    @Min(10)
    @Max(20)
    public min: number;

    @ApiProperty()
    @IsNotEmpty()
    @Min(21)
    @Max(30)
    public max: number;
}
