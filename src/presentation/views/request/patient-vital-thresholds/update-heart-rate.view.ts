import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than.validator';
import {AbsMaxHR, AbsMinHR} from 'domain/constants/vitals.const';

export class UpdateHeartRateView extends MinMaxThresholdDto {
    @ApiProperty({minimum: AbsMinHR, maximum: AbsMaxHR})
    @IsNotEmpty()
    @Min(AbsMinHR)
    @Max(AbsMaxHR)
    public min: number;

    @ApiProperty({minimum: AbsMinHR, maximum: AbsMaxHR})
    @IsNotEmpty()
    @Min(AbsMinHR)
    @Max(AbsMaxHR)
    @IsGreaterThan('min', {
        message: "Min Heart Rate can't be equal to or greater than max Heart Rate.",
    })
    public max: number;
}
