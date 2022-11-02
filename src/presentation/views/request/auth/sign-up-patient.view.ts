import {ApiProperty} from '@nestjs/swagger';
import {IsInt, Length, IsEmail, Min, Max, IsNotEmpty, IsIn, MinDate, MaxDate, IsDate} from 'class-validator';
import {CreatePatientDto} from 'domain/dtos/request/auth/create-patient.dto';
import {Type} from 'class-transformer';

export class SignUpPatientView extends CreatePatientDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1, 30)
    public firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1, 30)
    public lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(11, 11)
    public phone: string;

    @ApiProperty()
    @Type(() => Date)
    @IsNotEmpty()
    @IsDate()
    @MinDate(new Date(1930, 0, 1))
    @MaxDate(new Date())
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

    @ApiProperty()
    @IsNotEmpty()
    @Length(8)
    public password: string;
}
