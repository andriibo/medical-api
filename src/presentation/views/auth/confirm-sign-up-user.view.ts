import {ApiProperty} from '@nestjs/swagger';
import {ConfirmSignUpUserDto} from 'domain/dtos/auth/confirm-sign-up-user.dto';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class ConfirmSignUpUserView extends ConfirmSignUpUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    public userName: string;

    @ApiProperty()
    @IsNotEmpty()
    public code: string;
}
