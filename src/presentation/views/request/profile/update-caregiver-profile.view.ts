import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty, IsNumberString} from 'class-validator';
import {UpdateCaregiverProfileDto} from 'domain/dtos/request/profile';

export class UpdateCaregiverProfileView extends UpdateCaregiverProfileDto {
    @ApiProperty({minLength: 1, maxLength: 30})
    @IsNotEmpty()
    @Length(1, 30)
    public firstName: string;

    @ApiProperty({minLength: 1, maxLength: 30})
    @IsNotEmpty()
    @Length(1, 30)
    public lastName: string;

    @ApiProperty({minLength: 7, maxLength: 15})
    @IsNotEmpty()
    @Length(7, 15)
    @IsNumberString()
    public phone: string;
}
