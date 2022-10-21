import {UserRole, User} from 'domain/entities/user.entity';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {
    PatientDataAccessStatus,
    PatientDataAccessRequestDirection,
    PatientDataAccess,
} from 'domain/entities/patient-data-access.entity';
import {PatientDataAccessSpecificationError} from 'app/modules/patient-data-access/errors';

export class PatientDataAccessSpecification {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
    ) {}

    public async assertPatientCanGiveAccessForUser(patient: User, userToGrant: User): Promise<void> {
        if (!this.isUserRoleGrantable(userToGrant.role)) {
            throw new PatientDataAccessSpecificationError(
                'No doctor account with specified email address. Try another one.',
            );
        }

        const hasAccess = await this.hasAccessByPatientUserIdAndGrantedUserId(patient.id, userToGrant.id);

        if (hasAccess) {
            throw new PatientDataAccessSpecificationError(
                'Doctor with specified email address has been already invited.',
            );
        }
    }

    public async assertPatientCanGiveAccessForEmail(patient: User, email: string): Promise<void> {
        const userToGrant = await this.userRepository.getOneByEmail(email);

        if (userToGrant !== null) {
            throw new PatientDataAccessSpecificationError('Email address has been already invited.');
        }

        const hasAccess = await this.hasAccessByPatientUserIdAndGrantedEmail(patient.id, email);

        if (hasAccess) {
            throw new PatientDataAccessSpecificationError('Email address has been already invited.');
        }
    }

    public async assertGrantedUserCanRefuseAccess(grantedUser: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.grantedUserId === grantedUser.id;
        const isAccessStatusInitiated = dataAccess.status === PatientDataAccessStatus.Initiated;
        const isGrantedUserRequested = dataAccess.direction === PatientDataAccessRequestDirection.FromPatient;

        const isRefuseAllowed = isUserGranted && isAccessStatusInitiated && isGrantedUserRequested;

        if (!isRefuseAllowed) {
            throw new PatientDataAccessSpecificationError('Refuse Not Allowed.');
        }
    }

    public async assertGrantedUserCanApproveAccess(grantedUser: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.grantedUserId === grantedUser.id;
        const isAccessStatusInitiated = dataAccess.status === PatientDataAccessStatus.Initiated;
        const isGrantedUserRequested = dataAccess.direction === PatientDataAccessRequestDirection.FromPatient;

        const isApproveAllowed = isUserGranted && isAccessStatusInitiated && isGrantedUserRequested;

        if (!isApproveAllowed) {
            throw new PatientDataAccessSpecificationError('Approval Not Allowed.');
        }
    }

    public async assertGrantedUserCanDeleteAccess(grantedUser: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.grantedUserId === grantedUser.id;
        const isAccessStatusApproved = dataAccess.status === PatientDataAccessStatus.Approved;

        const isDeleteAllowed = isUserGranted && isAccessStatusApproved;

        if (!isDeleteAllowed) {
            throw new PatientDataAccessSpecificationError('Delete Not Allowed.');
        }
    }

    public async assertPatientCanDeleteAccess(patient: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.patientUserId === patient.id;
        const isGrantedUserRequested = dataAccess.direction === PatientDataAccessRequestDirection.FromPatient;

        const isDeleteAllowed = isUserGranted && isGrantedUserRequested;

        if (!isDeleteAllowed) {
            throw new PatientDataAccessSpecificationError('Delete Not Allowed.');
        }
    }

    public async assertGrantedUserHasAccess(grantedUser: User, patientUserId: string): Promise<void> {
        if (!this.isUserRoleGrantable(grantedUser.role)) {
            throw new PatientDataAccessSpecificationError('Access Is Absent.');
        }

        const dataAccess = await this.getAccessByPatientUserIdAndGrantedUserId(patientUserId, grantedUser.id);

        const isAccessStatusApproved = dataAccess.status === PatientDataAccessStatus.Approved;

        if (!isAccessStatusApproved) {
            throw new PatientDataAccessSpecificationError('Access Is Absent.');
        }
    }

    private isUserRoleGrantable(role: string): boolean {
        const grantableRoles = [UserRole.Caregiver, UserRole.Doctor];

        return grantableRoles.includes(role as UserRole);
    }

    private async getAccessByPatientUserIdAndGrantedUserId(
        patientUserId: string,
        grantedUserId: string,
    ): Promise<PatientDataAccess> {
        const dataAccess = await this.patientDataAccessRepository.getOneByPatientUserIdAndGrantedUserId(
            patientUserId,
            grantedUserId,
        );

        if (dataAccess === null) {
            throw new PatientDataAccessSpecificationError('Access Is Absent.');
        }

        return dataAccess;
    }

    private async getAccessByPatientUserIdAndGrantedEmail(
        patientUserId: string,
        grantedEmail: string,
    ): Promise<PatientDataAccess> {
        const dataAccess = await this.patientDataAccessRepository.getOneByPatientUserIdAndGrantedEmail(
            patientUserId,
            grantedEmail,
        );

        if (dataAccess === null) {
            throw new PatientDataAccessSpecificationError('Access Is Absent.');
        }

        return dataAccess;
    }

    private async hasAccessByPatientUserIdAndGrantedUserId(
        patientUserId: string,
        grantedUserId: string,
    ): Promise<boolean> {
        try {
            await this.getAccessByPatientUserIdAndGrantedUserId(patientUserId, grantedUserId);
        } catch {
            return false;
        }

        return true;
    }

    private async hasAccessByPatientUserIdAndGrantedEmail(
        patientUserId: string,
        grantedEmail: string,
    ): Promise<boolean> {
        try {
            await this.getAccessByPatientUserIdAndGrantedEmail(patientUserId, grantedEmail);
        } catch {
            return false;
        }

        return true;
    }
}
