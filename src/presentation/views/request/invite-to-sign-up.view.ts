import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class InviteToSignUpView {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    public email: string;
}
