import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {BloodPressureThresholdsDto} from 'domain/dtos/request/patient-vital-thresholds/blood-pressure-thresholds.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than.validator';
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
        message: "Min DBP can't be equal to or greater than max DBP.",
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
        message: "Min SBP can't be equal to or greater than max SBP.",
    })
    public maxSBP: number;
}
