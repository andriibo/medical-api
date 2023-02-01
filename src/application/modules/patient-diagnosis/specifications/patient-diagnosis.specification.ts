import {User} from 'domain/entities';
import {UserRole} from 'domain/entities/user.entity';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

export class PatientDiagnosisSpecification {
    public constructor(private readonly patientDataAccessSpecification: PatientDataAccessSpecification) {}

    public async assertUserCanOperateDiagnosis(user: User, patientUserId: string): Promise<void> {
        if (this.isUserPatientAndOwner(user, patientUserId)) {
            return;
        }

        await this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndPatientUserId(
            user.id,
            patientUserId,
        );
    }

    private isUserPatientAndOwner(user: User, patientUserId: string): boolean {
        return user.role === UserRole.Patient && user.id === patientUserId;
    }
}
