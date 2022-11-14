import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, MaxLength} from 'class-validator';
import {ResendSignUpCodeDto} from 'domain/dtos/request/auth';

export class ResendSignUpCodeView extends ResendSignUpCodeDto {
    @ApiProperty({maxLength: 100})
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;
}
