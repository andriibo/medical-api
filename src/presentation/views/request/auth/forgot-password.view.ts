import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, MaxLength} from 'class-validator';
import {ForgotPasswordDto} from 'domain/dtos/request/auth/forgot-password.dto';
import {Transform, TransformFnParams} from 'class-transformer';

export class ForgotPasswordView extends ForgotPasswordDto {
    @ApiProperty({maxLength: 100})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;
}
