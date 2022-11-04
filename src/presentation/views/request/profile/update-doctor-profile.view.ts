import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty} from 'class-validator';
import {UpdateDoctorProfileDto} from 'domain/dtos/request/profile/update-doctor-profile.dto';

export class UpdateDoctorProfileView extends UpdateDoctorProfileDto {
    @ApiProperty({minLength: 2, maxLength: 30})
    @IsNotEmpty()
    @Length(2, 30)
    public firstName: string;

    @ApiProperty({minLength: 2, maxLength: 30})
    @IsNotEmpty()
    @Length(2, 30)
    public lastName: string;

    @ApiProperty({minLength: 11, maxLength: 11})
    @IsNotEmpty()
    @Length(11, 11)
    public phone: string;

    @ApiProperty({maxLength: 100})
    @IsNotEmpty()
    @Length(0, 100)
    public institution: string;
}
