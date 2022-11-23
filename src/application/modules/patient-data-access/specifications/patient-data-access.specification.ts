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

    public async assertGrantedUserCanGiveAccessToPatient(grantedUser: User, patient: User): Promise<void> {
        const hasAccess = await this.hasAccessByPatientUserIdAndGrantedUserId(patient.id, grantedUser.id);

        if (hasAccess) {
            throw new PatientDataAccessSpecificationError(
                'Patient with specified email address has been already invited.',
            );
        }
    }

    public async assertPatientCanGiveAccessForGrantedEmail(patient: User, grantedEmail: string): Promise<void> {
        const userToGrant = await this.userRepository.getOneByEmail(grantedEmail);

        if (userToGrant !== null) {
            throw new PatientDataAccessSpecificationError('Email address has been already invited.');
        }

        const hasAccess = await this.hasAccessByPatientUserIdAndGrantedEmail(patient.id, grantedEmail);

        if (hasAccess) {
            throw new PatientDataAccessSpecificationError('Email address has been already invited.');
        }
    }

    public async assertGrantedUserCanGetAccessToUnregisteredPatient(
        grantedUser: User,
        patientEmail: string,
    ): Promise<void> {
        const patient = await this.userRepository.getOneByEmail(patientEmail);

        if (patient !== null) {
            throw new PatientDataAccessSpecificationError('Email address has been already invited.');
        }

        const hasAccess = await this.hasAccessByGrantedUserIdAndPatientEmail(grantedUser.id, patientEmail);

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

    public async assertPatientCanRefuseAccess(patient: User, dataAccess: PatientDataAccess): Promise<void> {
        const isPatient = dataAccess.patientUserId === patient.id;
        const isAccessStatusInitiated = dataAccess.status === PatientDataAccessStatus.Initiated;
        const isPatientRequested = dataAccess.direction === PatientDataAccessRequestDirection.ToPatient;

        const isRefuseAllowed = isPatient && isAccessStatusInitiated && isPatientRequested;

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

    public async assertPatientCanApproveAccess(patient: User, dataAccess: PatientDataAccess): Promise<void> {
        const isPatient = dataAccess.patientUserId === patient.id;
        const isAccessStatusInitiated = dataAccess.status === PatientDataAccessStatus.Initiated;
        const isPatientRequested = dataAccess.direction === PatientDataAccessRequestDirection.ToPatient;

        const isApproveAllowed = isPatient && isAccessStatusInitiated && isPatientRequested;

        if (!isApproveAllowed) {
            throw new PatientDataAccessSpecificationError('Approval Not Allowed.');
        }
    }

    public async assertGrantedUserCanDeleteAccess(grantedUser: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.grantedUserId === grantedUser.id;
        const isPatientRequested = dataAccess.direction === PatientDataAccessRequestDirection.ToPatient;
        const isAccessStatusApproved = dataAccess.status === PatientDataAccessStatus.Approved;

        const isDeleteAllowed = isUserGranted && (isPatientRequested || isAccessStatusApproved);

        if (!isDeleteAllowed) {
            throw new PatientDataAccessSpecificationError('Delete Not Allowed.');
        }
    }

    public async assertPatientCanDeleteAccess(patient: User, dataAccess: PatientDataAccess): Promise<void> {
        const isUserGranted = dataAccess.patientUserId === patient.id;
        const isGrantedUserRequested = dataAccess.direction === PatientDataAccessRequestDirection.FromPatient;
        const isAccessStatusApproved = dataAccess.status === PatientDataAccessStatus.Approved;

        const isDeleteAllowed = isUserGranted && (isGrantedUserRequested || isAccessStatusApproved);

        if (!isDeleteAllowed) {
            throw new PatientDataAccessSpecificationError('Delete Not Allowed.');
        }
    }

    public async assertGrantedUserHasAccess(grantedUser: User, patientUserId: string): Promise<void> {
        if (!this.isUserRoleGrantable(grantedUser.role)) {
            throw new PatientDataAccessSpecificationError('Access Is Absent.');
        }

        await this.assertGrantedUserIdHasAccess(grantedUser.id, patientUserId);
    }

    public async assertGrantedUserIdHasAccess(grantedUserId: string, patientUserId: string): Promise<void> {
        const dataAccess = await this.getAccessByPatientUserIdAndGrantedUserId(patientUserId, grantedUserId);

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

    private async getAccessByGrantedUserIdAndPatientEmail(
        grantedUserId: string,
        patientEmail: string,
    ): Promise<PatientDataAccess> {
        const dataAccess = await this.patientDataAccessRepository.getOneByGrantedUserIdAndPatientEmail(
            grantedUserId,
            patientEmail,
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

    private async hasAccessByGrantedUserIdAndPatientEmail(
        grantedUserId: string,
        patientEmail: string,
    ): Promise<boolean> {
        try {
            await this.getAccessByGrantedUserIdAndPatientEmail(grantedUserId, patientEmail);
        } catch {
            return false;
        }

        return true;
    }
}
