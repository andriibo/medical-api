import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Min, Max} from 'class-validator';
import {BloodPressureThresholdDto} from 'domain/dtos/request/patient-vital-threshold/blood-pressure-threshold.dto';

export class UpdateBloodPressureView extends BloodPressureThresholdDto {
    @ApiProperty()
    @IsNotEmpty()
    @Min(40)
    @Max(60)
    public minDBP: number;

    @ApiProperty()
    @IsNotEmpty()
    @Min(61)
    @Max(100)
    public maxDBP: number;

    @ApiProperty()
    @IsNotEmpty()
    @Min(90)
    @Max(120)
    public minSBP: number;

    @ApiProperty()
    @IsNotEmpty()
    @Min(121)
    @Max(150)
    public maxSBP: number;
}
