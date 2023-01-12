import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {BloodPressureThresholdsDto} from 'domain/dtos/request/patient-vital-threshold/blood-pressure-thresholds.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';
import {MinDBP, MaxDBP, MinSBP, MaxSBP} from 'domain/constants/thresholds.const';

export class UpdateBloodPressureView extends BloodPressureThresholdsDto {
    @ApiProperty({minimum: MinDBP, maximum: MaxDBP})
    @IsNotEmpty()
    @Min(MinDBP)
    @Max(MaxDBP)
    public minDBP: number;

    @ApiProperty({minimum: MinDBP, maximum: MaxDBP})
    @IsNotEmpty()
    @Min(MinDBP)
    @Max(MaxDBP)
    @IsGreaterThan('minDBP', {
        message: 'Max DBP must be greater than Min.',
    })
    public maxDBP: number;

    @ApiProperty({minimum: MinSBP, maximum: MaxSBP})
    @IsNotEmpty()
    @Min(MinSBP)
    @Max(MaxSBP)
    public minSBP: number;

    @ApiProperty({minimum: MinSBP, maximum: MaxSBP})
    @IsNotEmpty()
    @Min(MinSBP)
    @Max(MaxSBP)
    @IsGreaterThan('minSBP', {
        message: 'Max SBP must be greater than Min.',
    })
    public maxSBP: number;
}
