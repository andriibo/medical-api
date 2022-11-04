import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';

export class UpdateRespirationRateView extends MinMaxThresholdDto {
    @ApiProperty({minimum: 12, maximum: 25})
    @IsNotEmpty()
    @Min(12)
    @Max(25)
    public min: number;

    @ApiProperty({minimum: 12, maximum: 25})
    @IsNotEmpty()
    @Min(12)
    @Max(25)
    @IsGreaterThan('min', {
        message: 'Max Respiration Rate must be greater than Min.',
    })
    public max: number;
}
