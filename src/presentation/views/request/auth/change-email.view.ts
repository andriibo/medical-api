import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, MaxLength} from 'class-validator';
import {Transform, TransformFnParams} from 'class-transformer';

export class ChangeEmailView {
    @ApiProperty({maxLength: 100})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;
}
