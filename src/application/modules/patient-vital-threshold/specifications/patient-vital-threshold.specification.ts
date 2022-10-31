import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {User} from 'domain/entities';

export class PatientVitalThresholdSpecification {
    public constructor(private readonly patientDataAccessSpecification: PatientDataAccessSpecification) {}

    public async assertGrantedUserCanOperateThreshold(user: User, patientUserId: string): Promise<void> {
        await this.patientDataAccessSpecification.assertGrantedUserHasAccess(user, patientUserId);
    }
}
