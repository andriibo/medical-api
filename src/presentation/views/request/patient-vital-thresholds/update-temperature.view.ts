import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than.validator';
import {AbsMaxTemp, AbsMinTemp} from 'domain/constants/vitals.const';

export class UpdateTemperatureView extends MinMaxThresholdDto {
    @ApiProperty({minimum: AbsMinTemp, maximum: AbsMaxTemp, multipleOf: 0.1})
    @IsNotEmpty()
    @Min(AbsMinTemp)
    @Max(AbsMaxTemp)
    public min: number;

    @ApiProperty({minimum: AbsMinTemp, maximum: AbsMaxTemp, multipleOf: 0.1})
    @IsNotEmpty()
    @Min(AbsMinTemp)
    @Max(AbsMaxTemp)
    @IsGreaterThan('min', {
        message: 'Max Temperature must be greater than Min.',
    })
    public max: number;
}
