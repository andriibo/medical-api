import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty, IsOptional, IsNumberString} from 'class-validator';
import {UpdateDoctorProfileDto} from 'domain/dtos/request/profile/update-doctor-profile.dto';
import {MaxPhoneLength, MinPhoneLength} from 'infrastructure/constants/phone.const';

export class UpdateDoctorProfileView extends UpdateDoctorProfileDto {
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

    @ApiProperty({required: false, minLength: 0, maxLength: 100})
    @IsOptional()
    @Length(0, 100)
    public institution?: string;
}
