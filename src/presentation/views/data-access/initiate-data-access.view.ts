import {ApiProperty} from '@nestjs/swagger';
import {InitiateDataAccessDto} from 'domain/dtos/patient/initiate-data-access.dto';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class InitiateDataAccessView extends InitiateDataAccessDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    public email: string;
}
