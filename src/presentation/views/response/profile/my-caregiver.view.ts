import {ApiProperty} from '@nestjs/swagger';
import {MyCaregiverDto} from 'domain/dtos/response/profile/my-caregiver.dto';
import {UserView} from 'views/response/user';

export class MyCaregiverView extends UserView implements MyCaregiverDto {
    @ApiProperty()
    public accessId: string;
}
