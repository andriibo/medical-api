import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class ConfirmChangeEmailView {
    @ApiProperty()
    @IsNotEmpty()
    public code: string;
}
