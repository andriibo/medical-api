import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, MinLength} from 'class-validator';

export class ChangePasswordView {
    @ApiProperty({minLength: 8})
    @IsNotEmpty()
    @MinLength(8)
    public currentPassword: string;

    @ApiProperty({minLength: 8})
    @IsNotEmpty()
    @MinLength(8)
    public newPassword: string;
}
