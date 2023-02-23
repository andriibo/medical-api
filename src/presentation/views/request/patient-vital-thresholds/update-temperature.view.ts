import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';
import {MinTemp, MaxTemp} from 'domain/constants/thresholds.const';

export class UpdateTemperatureView extends MinMaxThresholdDto {
    @ApiProperty({minimum: MinTemp, maximum: MaxTemp, multipleOf: 0.1})
    @IsNotEmpty()
    @Min(MinTemp)
    @Max(MaxTemp)
    public min: number;

    @ApiProperty({minimum: MinTemp, maximum: MaxTemp, multipleOf: 0.1})
    @IsNotEmpty()
    @Min(MinTemp)
    @Max(MaxTemp)
    @IsGreaterThan('min', {
        message: 'Max Temperature must be greater than Min.',
    })
    public max: number;
}
