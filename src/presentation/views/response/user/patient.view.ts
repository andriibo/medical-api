import {ApiProperty} from '@nestjs/swagger';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';

export class PatientView extends PatientDto {
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
    public dob: Date;

    @ApiProperty()
    public gender: string;

    @ApiProperty()
    public height: number;

    @ApiProperty()
    public weight: number;

    @ApiProperty({nullable: true})
    public avatar: string | null;

    @ApiProperty({nullable: true})
    public deletedAt: number | null;

    @ApiProperty()
    public passwordUpdatedAt: number;
}
