import {ApiProperty} from '@nestjs/swagger';
import {Length, IsEmail, IsNotEmpty} from 'class-validator';
import {CreateDoctorDto} from 'domain/dtos/request/auth/create-doctor.dto';

export class SignUpDoctorView extends CreateDoctorDto {
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
    @Length(0, 100)
    public institution: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(8)
    public password: string;
}
