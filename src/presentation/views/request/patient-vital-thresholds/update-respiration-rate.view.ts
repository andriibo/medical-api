import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than.validator';
import {AbsMaxRR, AbsMinRR} from 'domain/constants/vitals.const';

export class UpdateRespirationRateView extends MinMaxThresholdDto {
    @ApiProperty({minimum: AbsMinRR, maximum: AbsMaxRR})
    @IsNotEmpty()
    @Min(AbsMinRR)
    @Max(AbsMaxRR)
    public min: number;

    @ApiProperty({minimum: AbsMinRR, maximum: AbsMaxRR})
    @IsNotEmpty()
    @Min(AbsMinRR)
    @Max(AbsMaxRR)
    @IsGreaterThan('min', {
        message: 'Max Respiration Rate must be greater than Min.',
    })
    public max: number;
}
