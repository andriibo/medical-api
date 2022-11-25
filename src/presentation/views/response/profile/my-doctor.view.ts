import {ApiProperty} from '@nestjs/swagger';
import {MyDoctorDto} from 'domain/dtos/response/profile/my-doctor.dto';
import {DoctorView} from 'views/response/user';

export class MyDoctorView extends DoctorView implements MyDoctorDto {
    @ApiProperty()
    public accessId: string;
}
