import {ApiProperty} from '@nestjs/swagger';
import {InitiateDataAccessDto} from 'domain/dtos/request/data-access/initiate-data-access.dto';
import {IsEmail, IsNotEmpty, MaxLength} from 'class-validator';
import {Transform, TransformFnParams} from 'class-transformer';

export class InitiateDataAccessView extends InitiateDataAccessDto {
    @ApiProperty({maxLength: 100})
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;
}
