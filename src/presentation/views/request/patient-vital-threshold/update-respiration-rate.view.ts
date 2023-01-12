import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';
import {MinRR, MaxRR} from 'domain/constants/thresholds.const';

export class UpdateRespirationRateView extends MinMaxThresholdDto {
    @ApiProperty({minimum: MinRR, maximum: MaxRR})
    @IsNotEmpty()
    @Min(MinRR)
    @Max(MaxRR)
    public min: number;

    @ApiProperty({minimum: MinRR, maximum: MaxRR})
    @IsNotEmpty()
    @Min(MinRR)
    @Max(MaxRR)
    @IsGreaterThan('min', {
        message: 'Max Respiration Rate must be greater than Min.',
    })
    public max: number;
}
