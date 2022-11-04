import {ApiProperty} from '@nestjs/swagger';
import {AuthUserDto} from 'domain/dtos/request/auth/auth-user.dto';
import {IsEmail, IsNotEmpty, Length, MaxLength} from 'class-validator';

export class SignInUserView extends AuthUserDto {
    @ApiProperty({maxLength: 100})
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public userName: string;

    @ApiProperty({minLength: 8})
    @IsNotEmpty()
    @Length(8)
    public password: string;
}
