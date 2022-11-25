import {ApiProperty} from '@nestjs/swagger';
import {MyDoctorDto} from 'domain/dtos/response/profile/my-doctor.dto';

export class MyDoctorView implements MyDoctorDto {
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
    public institution: string;

    @ApiProperty()
    public avatar: string;
}
