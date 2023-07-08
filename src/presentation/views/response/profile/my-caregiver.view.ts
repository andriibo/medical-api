import {ApiProperty} from '@nestjs/swagger';
import {MyCaregiverDto} from 'domain/dtos/response/profile/my-caregiver.dto';
import {CaregiverView} from 'views/response/user';

export class MyCaregiverView extends CaregiverView implements MyCaregiverDto {
    @ApiProperty()
    public accessId: string;
}
