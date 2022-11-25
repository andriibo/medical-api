import {ApiProperty} from '@nestjs/swagger';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';

export class MyPatientView implements MyPatientDto {
    @ApiProperty()
    public accessId: string;

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
    public weight: number;

    @ApiProperty()
    public avatar: string;
}
