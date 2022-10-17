import {ApiProperty} from '@nestjs/swagger';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';

export class PatientView extends PatientDto {
    @ApiProperty()
    public email: string;

    @ApiProperty()
    public firstName: string;

    @ApiProperty()
    public lastName: string;

    @ApiProperty()
    public phone: string;

    @ApiProperty()
    public dob: Date;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    height: number;

    @ApiProperty()
    wight: number;
}
