import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {BloodPressureThresholdsDto} from 'domain/dtos/request/patient-vital-thresholds/blood-pressure-thresholds.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';
import {AbsMaxDBP, AbsMaxSBP, AbsMinDBP, AbsMinSBP} from 'domain/constants/vitals.const';

export class UpdateBloodPressureView extends BloodPressureThresholdsDto {
    @ApiProperty({minimum: AbsMinDBP, maximum: AbsMaxDBP})
    @IsNotEmpty()
    @Min(AbsMinDBP)
    @Max(AbsMaxDBP)
    public minDBP: number;

    @ApiProperty({minimum: AbsMinDBP, maximum: AbsMaxDBP})
    @IsNotEmpty()
    @Min(AbsMinDBP)
    @Max(AbsMaxDBP)
    @IsGreaterThan('minDBP', {
        message: 'Max DBP must be greater than Min.',
    })
    public maxDBP: number;

    @ApiProperty({minimum: AbsMinSBP, maximum: AbsMaxSBP})
    @IsNotEmpty()
    @Min(AbsMinSBP)
    @Max(AbsMaxSBP)
    public minSBP: number;

    @ApiProperty({minimum: AbsMinSBP, maximum: AbsMaxSBP})
    @IsNotEmpty()
    @Min(AbsMinSBP)
    @Max(AbsMaxSBP)
    @IsGreaterThan('minSBP', {
        message: 'Max SBP must be greater than Min.',
    })
    public maxSBP: number;
}
