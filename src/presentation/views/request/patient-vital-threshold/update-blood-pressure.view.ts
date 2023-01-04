import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {BloodPressureThresholdsDto} from 'domain/dtos/request/patient-vital-threshold/blood-pressure-thresholds.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';
import {
    MinDBP,
    MaxDBP,
    MinSBP,
    MaxSBP,
} from 'app/modules/patient-vital-thresholds/templates/default-thresholds.template';

export class UpdateBloodPressureView extends BloodPressureThresholdsDto {
    @ApiProperty({minimum: MinDBP.value, maximum: MaxDBP.value})
    @IsNotEmpty()
    @Min(MinDBP.value)
    @Max(MaxDBP.value)
    public minDBP: number;

    @ApiProperty({minimum: MinDBP.value, maximum: MaxDBP.value})
    @IsNotEmpty()
    @Min(MinDBP.value)
    @Max(MaxDBP.value)
    @IsGreaterThan('minDBP', {
        message: 'Max DBP must be greater than Min.',
    })
    public maxDBP: number;

    @ApiProperty({minimum: MinSBP.value, maximum: MaxSBP.value})
    @IsNotEmpty()
    @Min(MinSBP.value)
    @Max(MaxSBP.value)
    public minSBP: number;

    @ApiProperty({minimum: MinSBP.value, maximum: MaxSBP.value})
    @IsNotEmpty()
    @Min(MinSBP.value)
    @Max(MaxSBP.value)
    @IsGreaterThan('minSBP', {
        message: 'Max SBP must be greater than Min.',
    })
    public maxSBP: number;
}
