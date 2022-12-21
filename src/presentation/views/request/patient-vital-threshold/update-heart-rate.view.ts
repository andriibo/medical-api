import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';
import {MinHR, MaxHR} from 'app/modules/patient-vital-threshold/templates/default-thresholds.template';

export class UpdateHeartRateView extends MinMaxThresholdDto {
    @ApiProperty({minimum: MinHR.value, maximum: MaxHR.value})
    @IsNotEmpty()
    @Min(MinHR.value)
    @Max(MaxHR.value)
    public min: number;

    @ApiProperty({minimum: MinHR.value, maximum: MaxHR.value})
    @IsNotEmpty()
    @Min(MinHR.value)
    @Max(MaxHR.value)
    @IsGreaterThan('min', {
        message: 'Max Heart Rate must be greater than Min.',
    })
    public max: number;
}
