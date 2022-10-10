import {ApiProperty} from '@nestjs/swagger';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {UserView} from 'views/user/user.view';

export class DataAccessView {
    @ApiProperty()
    accessId: string;

    @ApiProperty()
    direction: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    requestedUser: UserView;

    static fromPatientDataAccess(patientDataAccess: PatientDataAccess): DataAccessView {
        const view = new DataAccessView();
        view.accessId = patientDataAccess.accessId;
        view.direction = patientDataAccess.direction;
        view.status = patientDataAccess.status;
        view.createdAt = patientDataAccess.createdAt;

        return view;
    }
}
