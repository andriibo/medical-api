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
    public role: string;

    @ApiProperty()
    public roleLabel: string;

    @ApiProperty()
    public institution: string;

    @ApiProperty()
    public specialty: string;

    @ApiProperty({nullable: true})
    public avatar: string | null;

    @ApiProperty({nullable: true})
    public deletedAt: number | null;

    @ApiProperty()
    public passwordUpdatedAt: number;
}
