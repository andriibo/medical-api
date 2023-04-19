import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than.validator';
import {AbsMaxMAP, AbsMinMAP} from 'domain/constants/vitals.const';

export class UpdateMeanArterialPressureView extends MinMaxThresholdDto {
    @ApiProperty({minimum: AbsMinMAP, maximum: AbsMaxMAP})
    @IsNotEmpty()
    @Min(AbsMinMAP)
    @Max(AbsMaxMAP)
    public min: number;

    @ApiProperty({minimum: AbsMinMAP, maximum: AbsMaxMAP})
    @IsNotEmpty()
    @Min(AbsMinMAP)
    @Max(AbsMaxMAP)
    @IsGreaterThan('min', {
        message: "Min Mean Arterial Pressure can't be equal to or greater than max Mean Arterial Pressure.",
    })
    public max: number;
}
