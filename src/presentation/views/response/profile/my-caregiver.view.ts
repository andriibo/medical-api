import {ApiProperty} from '@nestjs/swagger';
import {CaregiverView} from 'views/response/user/caregiver.view';
import {MyCaregiverDto} from 'domain/dtos/response/profile/my-caregiver.dto';

export class MyCaregiverView extends CaregiverView implements MyCaregiverDto {
    @ApiProperty()
    public accessId: string;
}
