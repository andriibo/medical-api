import {ApiProperty} from '@nestjs/swagger';
import {Length, IsEmail, IsNotEmpty, IsOptional, MaxLength, IsNumberString} from 'class-validator';
import {CreateDoctorDto} from 'domain/dtos/request/auth/create-doctor.dto';
import {MaxPhoneLength, MinPhoneLength} from 'domain/constants/phone.const';
import {Transform, TransformFnParams} from 'class-transformer';

export class SignUpDoctorView extends CreateDoctorDto {
    @ApiProperty({maxLength: 100})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;

    @ApiProperty({minLength: 1, maxLength: 30})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Length(1, 30)
    public firstName: string;

    @ApiProperty({minLength: 1, maxLength: 30})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Length(1, 30)
    public lastName: string;

    @ApiProperty({minLength: MinPhoneLength, maxLength: MaxPhoneLength})
    @IsNotEmpty()
    @Length(MinPhoneLength, MaxPhoneLength)
    @IsNumberString()
    public phone: string;

    @ApiProperty({required: false, minLength: 0, maxLength: 100})
    @IsOptional()
    @Length(0, 100)
    public institution?: string;

    @ApiProperty({minLength: 8})
    @IsNotEmpty()
    @Length(8)
    public password: string;
}
