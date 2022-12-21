import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';
import {MinTemp, MaxTemp} from 'app/modules/patient-vital-threshold/templates/default-thresholds.template';

export class UpdateTemperatureView extends MinMaxThresholdDto {
    @ApiProperty({minimum: MinTemp.value, maximum: MaxTemp.value})
    @IsNotEmpty()
    @Min(MinTemp.value)
    @Max(MaxTemp.value)
    public min: number;

    @ApiProperty({minimum: MinTemp.value, maximum: MaxTemp.value})
    @IsNotEmpty()
    @Min(MinTemp.value)
    @Max(MaxTemp.value)
    @IsGreaterThan('min', {
        message: 'Max Temperature must be greater than Min.',
    })
    public max: number;
}
