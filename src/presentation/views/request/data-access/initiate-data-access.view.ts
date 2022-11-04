import {ApiProperty} from '@nestjs/swagger';
import {InitiateDataAccessDto} from 'domain/dtos/request/data-access/initiate-data-access.dto';
import {IsEmail, IsNotEmpty, MaxLength} from 'class-validator';

export class InitiateDataAccessView extends InitiateDataAccessDto {
    @ApiProperty({maxLength: 100})
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    public email: string;
}
