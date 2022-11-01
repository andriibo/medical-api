import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {BloodPressureThresholdDto} from 'domain/dtos/request/patient-vital-threshold/blood-pressure-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';

export class UpdateBloodPressureView extends BloodPressureThresholdDto {
    @ApiProperty()
    @IsNotEmpty()
    @Min(60)
    @Max(80)
    public minDBP: number;

    @ApiProperty()
    @IsNotEmpty()
    @Min(60)
    @Max(80)
    @IsGreaterThan('minDBP', {
        message: 'Max DBP must be greater than Min.',
    })
    public maxDBP: number;

    @ApiProperty()
    @IsNotEmpty()
    @Min(100)
    @Max(130)
    public minSBP: number;

    @ApiProperty()
    @IsNotEmpty()
    @Min(100)
    @Max(130)
    @IsGreaterThan('minSBP', {
        message: 'Max SBP must be greater than Min.',
    })
    public maxSBP: number;
}
