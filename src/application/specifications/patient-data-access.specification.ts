import {UserRole, User} from 'domain/entities/user.entity';
import {IPatientDataAccessRepository} from 'app/repositories';

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
}
