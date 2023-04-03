import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, MaxLength} from 'class-validator';
import {ResendSignUpCodeDto} from 'domain/dtos/request/auth';
import {Transform, TransformFnParams} from 'class-transformer';

export class ResendSignUpCodeView extends ResendSignUpCodeDto {
    @ApiProperty({maxLength: 100})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;
}
