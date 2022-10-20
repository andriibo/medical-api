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
    public gender: string;

    @ApiProperty()
    public height: number;

    @ApiProperty()
    public wight: number;
}
