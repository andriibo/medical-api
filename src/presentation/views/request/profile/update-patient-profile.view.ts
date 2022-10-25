import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty, IsDateString, IsIn, IsInt, Min, Max} from 'class-validator';
import {UpdatePatientProfileDto} from 'domain/dtos/request/profile/update-patient-profile.dto';

export class UpdatePatientProfileView extends UpdatePatientProfileDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 30)
    public firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 30)
    public lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(11, 11)
    public phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    public dob: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn(['Male', 'Female', 'Other'])
    public gender: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(50)
    @Max(250)
    public height: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(10)
    @Max(200)
    public weight: number;
}
