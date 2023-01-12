import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty, IsNumberString} from 'class-validator';
import {UpdateCaregiverProfileDto} from 'domain/dtos/request/profile';
import {MaxPhoneLength, MinPhoneLength} from 'infrastructure/constants/phone.const';

export class UpdateCaregiverProfileView extends UpdateCaregiverProfileDto {
    @ApiProperty({minLength: 1, maxLength: 30})
    @IsNotEmpty()
    @Length(1, 30)
    public firstName: string;

    @ApiProperty({minLength: 1, maxLength: 30})
    @IsNotEmpty()
    @Length(1, 30)
    public lastName: string;

    @ApiProperty({minLength: MinPhoneLength, maxLength: MaxPhoneLength})
    @IsNotEmpty()
    @Length(MinPhoneLength, MaxPhoneLength)
    @IsNumberString()
    public phone: string;
}
