import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, MaxLength, MinLength} from 'class-validator';
import {ConfirmForgotPasswordDto} from 'domain/dtos/request/auth/confirm-forgot-password.dto';
import {Transform, TransformFnParams} from 'class-transformer';

export class ConfirmForgotPasswordView extends ConfirmForgotPasswordDto {
    @ApiProperty({maxLength: 100})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;

    @ApiProperty()
    @IsNotEmpty()
    public code: string;

    @ApiProperty({minLength: 8})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @MinLength(8)
    public newPassword: string;
}
