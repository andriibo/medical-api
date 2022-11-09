import {ApiProperty} from '@nestjs/swagger';
import {ConfirmSignUpUserDto} from 'domain/dtos/request/auth/confirm-sign-up-user.dto';
import {IsEmail, IsNotEmpty, MaxLength} from 'class-validator';

export class ConfirmSignUpUserView extends ConfirmSignUpUserDto {
    @ApiProperty({maxLength: 100})
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;

    @ApiProperty()
    @IsNotEmpty()
    public code: string;
}
