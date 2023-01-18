import {ApiProperty} from '@nestjs/swagger';
import {CaregiverDto} from 'domain/dtos/response/profile/caregiver.dto';

export class CaregiverView extends CaregiverDto {
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
    public avatar: string;
}
