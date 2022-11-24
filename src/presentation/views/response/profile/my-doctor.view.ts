import {ApiProperty} from '@nestjs/swagger';
import {MyDoctorDto} from 'domain/dtos/response/profile/my-doctor.dto';
import {IsEmail, IsNotEmpty, IsNumberString, Length, MaxLength} from 'class-validator';

export class MyDoctorView implements MyDoctorDto {
    @ApiProperty()
    public accessId: string;

    @ApiProperty({maxLength: 100})
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
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
    @IsNumberString()
    public phone: string;

    @ApiProperty()
    public avatar: string;
}
