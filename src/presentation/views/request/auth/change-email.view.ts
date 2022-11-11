import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, MaxLength} from 'class-validator';

export class ChangeEmailView {
    @ApiProperty({maxLength: 100})
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;
}
