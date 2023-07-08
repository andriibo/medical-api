import {User} from 'domain/entities';
import {UserRoleEnum} from 'domain/constants/user.const';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

export class PatientMedicationSpecification {
    public constructor(private readonly patientDataAccessSpecification: PatientDataAccessSpecification) {}

    public async assertUserCanOperateMedication(user: User, patientUserId: string): Promise<void> {
        if (this.isUserPatientAndOwner(user, patientUserId)) {
            return;
        }

        await this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndPatientUserId(
            user.id,
            patientUserId,
        );
    }

    private isUserPatientAndOwner(user: User, patientUserId: string): boolean {
        return user.role === UserRoleEnum.Patient && user.id === patientUserId;
    }
}
