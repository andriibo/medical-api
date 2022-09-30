import {ApiProperty} from '@nestjs/swagger';
import {IsInt, Length, IsEmail, IsDate, Min, Max, IsNotEmpty} from 'class-validator';

export class SignUpPatientView {
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
    public phone: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    public dob: Date;

    @ApiProperty()
    @IsNotEmpty()
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
    public password: string;
}
