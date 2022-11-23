import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty, IsOptional} from 'class-validator';
import {UpdateDoctorProfileDto} from 'domain/dtos/request/profile/update-doctor-profile.dto';

export class UpdateDoctorProfileView extends UpdateDoctorProfileDto {
    @ApiProperty({minLength: 1, maxLength: 30})
    @IsNotEmpty()
    @Length(1, 30)
    public firstName: string;

    @ApiProperty({minLength: 1, maxLength: 30})
    @IsNotEmpty()
    @Length(1, 30)
    public lastName: string;

    @ApiProperty({minLength: 11, maxLength: 11})
    @IsNotEmpty()
    @Length(11, 11)
    public phone: string;

    @ApiProperty({required: false, minLength: 0, maxLength: 100})
    @IsOptional()
    @Length(0, 100)
    public institution?: string;
}
