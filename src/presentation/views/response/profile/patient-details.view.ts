import {ApiProperty} from '@nestjs/swagger';
import {PatientView} from 'views/response/user';

export class PatientDetailsView extends PatientView {
    @ApiProperty()
    public id?: string;
}
