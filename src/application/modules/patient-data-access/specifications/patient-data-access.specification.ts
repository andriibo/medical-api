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

    public async assertPatientCanGiveAccessForDoctor(patient: User, doctor: User): Promise<void> {
        if (doctor.role !== UserRole.Doctor) {
            throw new PatientDataAccessSpecificationError(
                'This email address is already used by another patient. Try another one.',
            );
        }

        this.assertUserIsActive(doctor);

        const hasAccess = await this.hasAccessByPatientUserIdAndGrantedUserId(patient.id, doctor.id);

        if (hasAccess) {
            throw new PatientDataAccessSpecificationError(
                'Doctor with specified email address has been already invited.',
            );
        }
    }

    public async assertPatientCanGiveAccessForCaregiver(patient: User, caregiver: User): Promise<void> {
        if (caregiver.role !== UserRole.Caregiver) {
            throw new PatientDataAccessSpecificationError(
                'No caregiver account with specified email address. Try another one.',
            );
        }

        this.assertUserIsActive(caregiver);

        const hasAccess = await this.hasAccessByPatientUserIdAndGrantedUserId(patient.id, caregiver.id);

        if (hasAccess) {
            throw new PatientDataAccessSpecificationError(
                'Caregiver with specified email address has been already invited.',
            );
        }
    }

    public async assertGrantedUserCanGetAccessToPatient(grantedUser: User, patient: User): Promise<void> {
        if (patient.role !== UserRole.Patient) {
            throw new PatientDataAccessSpecificationError(
                'This email address is already used by another doctor. Try another one.',
            );
        }

        this.assertUserIsActive(patient);

        const hasAccess = await this.hasAccessByPatientUserIdAndGrantedUserId(patient.id, grantedUser.id);

        if (hasAccess) {
            throw new PatientDataAccessSpecificationError(
                'Patient with specified email address has been already invited.',
            );
        }
    }

    public async assertPatientCanGiveAccessForGrantedEmail(patient: User, grantedEmail: string): Promise<void> {
        const dataAccess = await this.patientDataAccessRepository.getOneByPatientUserIdAndGrantedEmail(
            patient.id,
            grantedEmail,
        );

        if (dataAccess) {
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

        const dataAccess = await this.patientDataAccessRepository.getOneByGrantedUserIdAndPatientEmail(
            grantedUser.id,
            patientEmail,
        );

        if (dataAccess) {
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

    public assertAccessIsOpenByGrantedUserIdAndAccess(
        grantedUserId: string,
        dataAccess: PatientDataAccess | null,
    ): void {
        if (dataAccess === null) {
            throw new PatientDataAccessSpecificationError('Access Is Absent.');
        }

        const isAccessStatusApproved =
            dataAccess.status === PatientDataAccessStatus.Approved && dataAccess.grantedUserId === grantedUserId;

        if (!isAccessStatusApproved) {
            throw new PatientDataAccessSpecificationError('Access Is Absent.');
        }
    }

    public async assertAccessIsOpenByGrantedUserIdAndPatientUserId(
        grantedUserId: string,
        patientUserId: string,
    ): Promise<void> {
        const dataAccess = await this.getAccessByPatientUserIdAndGrantedUserId(patientUserId, grantedUserId);
        this.assertAccessIsOpenByGrantedUserIdAndAccess(grantedUserId, dataAccess);
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

    private assertUserIsActive(user: User): void {
        if (user.deletedAt !== null || user.email === null) {
            throw new PatientDataAccessSpecificationError(
                `You can\'t invite this user because the user\'s account is currently inactive`,
            );
        }
    }
}
