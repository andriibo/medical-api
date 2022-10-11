import {UserRole, User} from 'domain/entities/user.entity';
import {IPatientDataAccessRepository} from 'app/repositories';
import {
    PatientDataAccessStatus,
    PatientDataAccessRequestDirection,
    PatientDataAccess,
} from 'domain/entities/patient-data-access.entity';

export class PatientDataAccessSpecification {
    constructor(private readonly patientDataAccessRepository: IPatientDataAccessRepository) {}

    private isUserRoleGrantable(role: string): boolean {
        const grantableRoles = [UserRole.Caregiver, UserRole.Doctor];

        return grantableRoles.includes(role as UserRole);
    }

    private async hasInitiatedAccess(patient: User, userToGrant: User): Promise<boolean> {
        const dataAccess = await this.patientDataAccessRepository.getOneByPatientAndGrantedUser(patient, userToGrant);

        return dataAccess !== null;
    }

    async assertAccessCanBeInitiated(patient: User, userToGrant: User): Promise<void> {
        if (!this.isUserRoleGrantable(userToGrant.role)) {
            throw new Error('No doctor account with specified email address. Try another one.');
        }

        const hasInitiatedAccess = await this.hasInitiatedAccess(patient, userToGrant);

        if (hasInitiatedAccess) {
            throw new Error('Doctor with specified email address has been already invited.');
        }
    }

    async assertGrantedUserCanRefuseAccess(grantedUser: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.grantedUserId === grantedUser.userId;
        const isAccessStatusInitiated = dataAccess.status === PatientDataAccessStatus.Initiated;
        const isGrantedUserRequested = dataAccess.direction === PatientDataAccessRequestDirection.FromPatient;

        const isRefuseAllowed = isUserGranted && isAccessStatusInitiated && isGrantedUserRequested;

        if (!isRefuseAllowed) {
            throw new Error('Refuse Not Allowed.');
        }
    }

    async assertGrantedUserCanApproveAccess(grantedUser: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.grantedUserId === grantedUser.userId;
        const isAccessStatusInitiated = dataAccess.status === PatientDataAccessStatus.Initiated;
        const isGrantedUserRequested = dataAccess.direction === PatientDataAccessRequestDirection.FromPatient;

        const isApproveAllowed = isUserGranted && isAccessStatusInitiated && isGrantedUserRequested;

        if (!isApproveAllowed) {
            throw new Error('Approval Not Allowed.');
        }
    }

    async assertGrantedUserCanDeleteAccess(grantedUser: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.grantedUserId === grantedUser.userId;
        const isAccessStatusApproved = dataAccess.status === PatientDataAccessStatus.Approved;

        const isDeleteAllowed = isUserGranted && isAccessStatusApproved;

        if (!isDeleteAllowed) {
            throw new Error('Delete Not Allowed.');
        }
    }

    async assertPatientCanDeleteAccess(patient: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.patientUserId === patient.userId;
        const isGrantedUserRequested = dataAccess.direction === PatientDataAccessRequestDirection.FromPatient;

        const isDeleteAllowed = isUserGranted && isGrantedUserRequested;

        if (!isDeleteAllowed) {
            throw new Error('Delete Not Allowed.');
        }
    }
}
