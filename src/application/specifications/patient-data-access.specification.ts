import {UserRole, User} from 'domain/entities/user.entity';
import {IPatientDataAccessRepository} from 'app/repositories';
import {
    PatientDataAccessStatus,
    PatientDataAccessRequestDirection,
    PatientDataAccess,
} from 'domain/entities/patient-data-access.entity';
import {PatientDataAccessSpecificationError} from 'app/errors/patient-data-access-specification.error';

export class PatientDataAccessSpecification {
    constructor(private readonly patientDataAccessRepository: IPatientDataAccessRepository) {}

    private isUserRoleGrantable(role: string): boolean {
        const grantableRoles = [UserRole.Caregiver, UserRole.Doctor];

        return grantableRoles.includes(role as UserRole);
    }

    private async getAccess(patient: User, userToGrant: User): Promise<PatientDataAccess> {
        const dataAccess = await this.patientDataAccessRepository.getOneByPatientAndGrantedUser(patient, userToGrant);

        if (dataAccess === null) {
            throw new PatientDataAccessSpecificationError('Access Is Absent.');
        }

        return dataAccess;
    }

    private async hasInitiatedAccess(patient: User, userToGrant: User): Promise<boolean> {
        try {
            await this.getAccess(patient, userToGrant);
        } catch {
            return false;
        }

        return true;
    }

    async assertAccessCanBeInitiated(patient: User, userToGrant: User): Promise<void> {
        if (!this.isUserRoleGrantable(userToGrant.role)) {
            throw new PatientDataAccessSpecificationError(
                'No doctor account with specified email address. Try another one.',
            );
        }

        const hasInitiatedAccess = await this.hasInitiatedAccess(patient, userToGrant);

        if (hasInitiatedAccess) {
            throw new PatientDataAccessSpecificationError(
                'Doctor with specified email address has been already invited.',
            );
        }
    }

    async assertGrantedUserCanRefuseAccess(grantedUser: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.grantedUserId === grantedUser.userId;
        const isAccessStatusInitiated = dataAccess.status === PatientDataAccessStatus.Initiated;
        const isGrantedUserRequested = dataAccess.direction === PatientDataAccessRequestDirection.FromPatient;

        const isRefuseAllowed = isUserGranted && isAccessStatusInitiated && isGrantedUserRequested;

        if (!isRefuseAllowed) {
            throw new PatientDataAccessSpecificationError('Refuse Not Allowed.');
        }
    }

    async assertGrantedUserCanApproveAccess(grantedUser: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.grantedUserId === grantedUser.userId;
        const isAccessStatusInitiated = dataAccess.status === PatientDataAccessStatus.Initiated;
        const isGrantedUserRequested = dataAccess.direction === PatientDataAccessRequestDirection.FromPatient;

        const isApproveAllowed = isUserGranted && isAccessStatusInitiated && isGrantedUserRequested;

        if (!isApproveAllowed) {
            throw new PatientDataAccessSpecificationError('Approval Not Allowed.');
        }
    }

    async assertGrantedUserCanDeleteAccess(grantedUser: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.grantedUserId === grantedUser.userId;
        const isAccessStatusApproved = dataAccess.status === PatientDataAccessStatus.Approved;

        const isDeleteAllowed = isUserGranted && isAccessStatusApproved;

        if (!isDeleteAllowed) {
            throw new PatientDataAccessSpecificationError('Delete Not Allowed.');
        }
    }

    async assertPatientCanDeleteAccess(patient: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.patientUserId === patient.userId;
        const isGrantedUserRequested = dataAccess.direction === PatientDataAccessRequestDirection.FromPatient;

        const isDeleteAllowed = isUserGranted && isGrantedUserRequested;

        if (!isDeleteAllowed) {
            throw new PatientDataAccessSpecificationError('Delete Not Allowed.');
        }
    }

    async assertGrantedUserHasAccess(grantedUser: User, patient: User): Promise<void> {
        const dataAccess = await this.getAccess(patient, grantedUser);

        const isAccessStatusApproved = dataAccess.status === PatientDataAccessStatus.Approved;

        if (!isAccessStatusApproved) {
            throw new PatientDataAccessSpecificationError('Access Is Absent.');
        }
    }
}
