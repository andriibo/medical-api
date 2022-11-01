import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';

export class UpdateHeartRateView extends MinMaxThresholdDto {
    @ApiProperty()
    @IsNotEmpty()
    @Min(40)
    @Max(100)
    public min: number;

    @ApiProperty()
    @IsNotEmpty()
    @Min(40)
    @Max(100)
    @IsGreaterThan('min', {
        message: 'Max Heart Rate must be greater than Min.',
    })
    public max: number;
}
