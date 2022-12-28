import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';
import {IsGreaterThan} from 'infrastructure/validators/is-greater-than';
import {MinMAP, MaxMAP} from 'app/modules/patient-vital-thresholds/templates/default-thresholds.template';

export class UpdateMeanArterialPressureView extends MinMaxThresholdDto {
    @ApiProperty({minimum: MinMAP.value, maximum: MaxMAP.value})
    @IsNotEmpty()
    @Min(MinMAP.value)
    @Max(MaxMAP.value)
    public min: number;

    @ApiProperty({minimum: MinMAP.value, maximum: MaxMAP.value})
    @IsNotEmpty()
    @Min(MinMAP.value)
    @Max(MaxMAP.value)
    @IsGreaterThan('min', {
        message: 'Max Mean Arterial Pressure must be greater than Min.',
    })
    public max: number;
}
