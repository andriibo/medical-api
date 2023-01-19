import {ApiProperty} from '@nestjs/swagger';
import {DoctorDto} from 'domain/dtos/response/profile/doctor.dto';

export class DoctorView extends DoctorDto {
    @ApiProperty()
    public userId: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public firstName: string;

    @ApiProperty()
    public lastName: string;

    @ApiProperty()
    public phone: string;

    @ApiProperty()
    public institution: string;

    @ApiProperty()
    public avatar: string;

    @ApiProperty()
    public deletedAt: number | null;
}
