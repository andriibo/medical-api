import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';
import {MinMAP, MaxMAP} from 'domain/constants/thresholds.const';

export class UpdateMeanArterialPressureView extends MinMaxThresholdDto {
    @ApiProperty({minimum: MinMAP, maximum: MaxMAP})
    @IsNotEmpty()
    @Min(MinMAP)
    @Max(MaxMAP)
    public min: number;

    @ApiProperty({minimum: MinMAP, maximum: MaxMAP})
    @IsNotEmpty()
    @Min(MinMAP)
    @Max(MaxMAP)
    @IsGreaterThan('min', {
        message: 'Max Mean Arterial Pressure must be greater than Min.',
    })
    public max: number;
}
