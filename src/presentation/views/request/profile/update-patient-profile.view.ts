import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty, IsDateString, IsIn, IsInt, Min, Max} from 'class-validator';
import {UpdatePatientProfileDto} from 'domain/dtos/request/profile/update-patient-profile.dto';

export class UpdatePatientProfileView extends UpdatePatientProfileDto {
    @ApiProperty({minLength: 2, maxLength: 30})
    @IsNotEmpty()
    @Length(2, 30)
    public firstName: string;

    @ApiProperty({minLength: 2, maxLength: 30})
    @IsNotEmpty()
    @Length(2, 30)
    public lastName: string;

    @ApiProperty({minLength: 11, maxLength: 11})
    @IsNotEmpty()
    @Length(11, 11)
    public phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    public dob: Date;

    @ApiProperty({enum: ['Male', 'Female', 'Other']})
    @IsNotEmpty()
    @IsIn(['Male', 'Female', 'Other'])
    public gender: string;

    @ApiProperty({minimum: 50, maximum: 250})
    @IsNotEmpty()
    @IsInt()
    @Min(50)
    @Max(250)
    public height: number;

    @ApiProperty({minimum: 10, maximum: 200})
    @IsNotEmpty()
    @IsInt()
    @Min(10)
    @Max(200)
    public weight: number;
}
