import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Length} from 'class-validator';

export class ChangePasswordView {
    @ApiProperty({minLength: 8})
    @IsNotEmpty()
    @Length(8)
    public currentPassword: string;

    @ApiProperty({minLength: 8})
    @IsNotEmpty()
    @Length(8)
    public newPassword: string;
}
