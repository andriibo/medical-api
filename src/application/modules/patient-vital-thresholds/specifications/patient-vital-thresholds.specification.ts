import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {User} from 'domain/entities';

export class PatientVitalThresholdsSpecification {
    public constructor(private readonly patientDataAccessSpecification: PatientDataAccessSpecification) {}

    public async assertGrantedUserCanOperateThreshold(user: User, patientUserId: string): Promise<void> {
        await this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndPatientUserId(
            user.id,
            patientUserId,
        );
    }
}
