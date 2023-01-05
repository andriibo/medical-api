import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';
import {MinRR, MaxRR} from 'app/modules/patient-vital-thresholds/templates/default-thresholds.template';

export class UpdateRespirationRateView extends MinMaxThresholdDto {
    @ApiProperty({minimum: MinRR.value, maximum: MaxRR.value})
    @IsNotEmpty()
    @Min(MinRR.value)
    @Max(MaxRR.value)
    public min: number;

    @ApiProperty({minimum: MinRR.value, maximum: MaxRR.value})
    @IsNotEmpty()
    @Min(MinRR.value)
    @Max(MaxRR.value)
    @IsGreaterThan('min', {
        message: 'Max Respiration Rate must be greater than Min.',
    })
    public max: number;
}
