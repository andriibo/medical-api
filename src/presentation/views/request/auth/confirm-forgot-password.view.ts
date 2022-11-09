import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, Length, MaxLength} from 'class-validator';
import {ConfirmForgotPasswordDto} from 'domain/dtos/request/auth/confirm-forgot-password.dto';

export class ConfirmForgotPasswordView extends ConfirmForgotPasswordDto {
    @ApiProperty({maxLength: 100})
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;

    @ApiProperty()
    @IsNotEmpty()
    public code: string;

    @ApiProperty({minLength: 8})
    @IsNotEmpty()
    @Length(8)
    public newPassword: string;
}
