import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, MaxLength} from 'class-validator';
import {ForgotPasswordDto} from 'domain/dtos/request/auth/forgot-password.dto';

export class ForgotPasswordView extends ForgotPasswordDto {
    @ApiProperty({maxLength: 100})
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;
}
