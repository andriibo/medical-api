import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';

export class UpdateMeanArterialPressureView extends MinMaxThresholdDto {
    @ApiProperty({minimum: 65, maximum: 110})
    @IsNotEmpty()
    @Min(65)
    @Max(110)
    public min: number;

    @ApiProperty({minimum: 65, maximum: 110})
    @IsNotEmpty()
    @Min(65)
    @Max(110)
    @IsGreaterThan('min', {
        message: 'Max Mean Arterial Pressure must be greater than Min.',
    })
    public max: number;
}
