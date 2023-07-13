import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {User} from 'domain/entities';
import {UserRoleEnum} from 'domain/constants/user.const';
import {PatientStatus} from 'domain/entities/patient-status.entity';

export class PatientStatusSpecification {
    public constructor(private readonly patientDataAccessSpecification: PatientDataAccessSpecification) {}

    public async assertUserCanGetPatientStatus(user: User, patientUserId: string): Promise<void> {
        if (this.isUserPatientAndOwner(user, patientUserId)) {
            return;
        }

        await this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndPatientUserId(
            user.id,
            patientUserId,
        );
    }

    public async assertUserCanSetNormal(user: User, patientStatus: PatientStatus): Promise<void> {
        await this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndPatientUserId(
            user.id,
            patientStatus.patientUserId,
        );
    }

    private isUserPatientAndOwner(user: User, patientUserId: string): boolean {
        return user.role === UserRoleEnum.Patient && user.id === patientUserId;
    }
}
