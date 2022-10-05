import {ApiProperty} from '@nestjs/swagger';
import {IsInt, Length, IsEmail, IsDateString, Min, Max, IsNotEmpty, IsIn} from 'class-validator';
import {CreatePatientDto} from 'domain/dtos/create-patient.dto';

export class SignUpPatientView extends CreatePatientDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    public email: string;

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
    public wight: number;

    @ApiProperty()
    @IsNotEmpty()
    @Length(8)
    public password: string;
}
