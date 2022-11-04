import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';

export class UpdateTemperatureView extends MinMaxThresholdDto {
    @ApiProperty({minimum: 35, maximum: 42})
    @IsNotEmpty()
    @Min(35)
    @Max(42)
    public min: number;

    @ApiProperty({minimum: 35, maximum: 42})
    @IsNotEmpty()
    @Min(35)
    @Max(42)
    @IsGreaterThan('min', {
        message: 'Max Temperature must be greater than Min.',
    })
    public max: number;
}
