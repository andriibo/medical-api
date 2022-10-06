import {ApiProperty} from '@nestjs/swagger';
import {AuthUserDto} from 'domain/dtos/auth/auth-user.dto';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class SignInUserView extends AuthUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    public userName: string;

    @ApiProperty()
    @IsNotEmpty()
    public password: string;
}
