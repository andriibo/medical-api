import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';
import {MinHR, MaxHR} from 'domain/constants/thresholds.const';

export class UpdateHeartRateView extends MinMaxThresholdDto {
    @ApiProperty({minimum: MinHR, maximum: MaxHR})
    @IsNotEmpty()
    @Min(MinHR)
    @Max(MaxHR)
    public min: number;

    @ApiProperty({minimum: MinHR, maximum: MaxHR})
    @IsNotEmpty()
    @Min(MinHR)
    @Max(MaxHR)
    @IsGreaterThan('min', {
        message: 'Max Heart Rate must be greater than Min.',
    })
    public max: number;
}
