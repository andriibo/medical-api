import {ApiProperty} from '@nestjs/swagger';
import {IsInt, Length, IsEmail, Min, Max, IsNotEmpty, IsIn, MinDate, MaxDate, IsDate} from 'class-validator';
import {CreatePatientDto} from 'domain/dtos/request/auth/create-patient.dto';
import {Transform} from 'class-transformer';

export class SignUpPatientView extends CreatePatientDto {
    @ApiProperty({maxLength: 100})
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @ApiProperty({minLength: 1, maxLength: 30})
    @IsNotEmpty()
    @Length(1, 30)
    public firstName: string;

    @ApiProperty({minLength: 1, maxLength: 30})
    @IsNotEmpty()
    @Length(1, 30)
    public lastName: string;

    @ApiProperty({minLength: 11, maxLength: 11})
    @IsNotEmpty()
    @Length(11, 11)
    public phone: string;

    @ApiProperty()
    @Transform(({value}) => new Date(value))
    @IsNotEmpty()
    @IsDate()
    @MinDate(new Date(1930, 0, 1))
    @MaxDate(new Date())
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

    @ApiProperty({minLength: 8})
    @IsNotEmpty()
    @Length(8)
    public password: string;
}
