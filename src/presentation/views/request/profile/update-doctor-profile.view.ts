import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty} from 'class-validator';
import {UpdateDoctorProfileDto} from 'domain/dtos/request/profile/update-doctor-profile.dto';

export class UpdateDoctorProfileView extends UpdateDoctorProfileDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 30)
    public firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 30)
    public lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(11, 11)
    public phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(0, 100)
    public institution: string;
}
