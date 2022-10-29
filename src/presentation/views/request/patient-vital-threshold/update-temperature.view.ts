import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';

export class UpdateTemperatureView extends MinMaxThresholdDto {
    @ApiProperty()
    @IsNotEmpty()
    @Min(35)
    @Max(37)
    public min: number;

    @ApiProperty()
    @IsNotEmpty()
    @Min(37.1)
    @Max(42)
    public max: number;
}
