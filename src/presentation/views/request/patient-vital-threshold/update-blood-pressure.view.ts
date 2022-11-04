import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {BloodPressureThresholdDto} from 'domain/dtos/request/patient-vital-threshold/blood-pressure-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';

export class UpdateBloodPressureView extends BloodPressureThresholdDto {
    @ApiProperty({minimum: 60, maximum: 80})
    @IsNotEmpty()
    @Min(60)
    @Max(80)
    public minDBP: number;

    @ApiProperty({minimum: 60, maximum: 80})
    @IsNotEmpty()
    @Min(60)
    @Max(80)
    @IsGreaterThan('minDBP', {
        message: 'Max DBP must be greater than Min.',
    })
    public maxDBP: number;

    @ApiProperty({minimum: 100, maximum: 130})
    @IsNotEmpty()
    @Min(100)
    @Max(130)
    public minSBP: number;

    @ApiProperty({minimum: 100, maximum: 130})
    @IsNotEmpty()
    @Min(100)
    @Max(130)
    @IsGreaterThan('minSBP', {
        message: 'Max SBP must be greater than Min.',
    })
    public maxSBP: number;
}
