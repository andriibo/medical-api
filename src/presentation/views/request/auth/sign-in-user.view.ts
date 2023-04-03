import {ApiProperty} from '@nestjs/swagger';
import {AuthUserDto} from 'domain/dtos/request/auth/auth-user.dto';
import {IsBoolean, IsEmail, IsNotEmpty, MaxLength, MinLength} from 'class-validator';

export class SignInUserView extends AuthUserDto {
    @ApiProperty({maxLength: 100})
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;

    @ApiProperty({minLength: 8})
    @IsNotEmpty()
    @MinLength(8, {message: 'Incorrect email or password.'})
    public password: string;

    @ApiProperty()
    @IsBoolean()
    public rememberMe: boolean;
}
