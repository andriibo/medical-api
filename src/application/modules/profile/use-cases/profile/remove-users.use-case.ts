import {IUserRepository} from 'app/modules/auth/repositories';
import {IRemoveDoctorService} from 'app/modules/profile/services/remove-doctor.service';
import {UserRole} from 'domain/entities/user.entity';
import {IRemoveCaregiverOrPatientService} from 'app/modules/profile/services/remove-caregiver-or-patient.service';

export class RemoveUsersUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly removeCaregiverOrPatientService: IRemoveCaregiverOrPatientService,
        private readonly removeDoctorService: IRemoveDoctorService,
    ) {}

    public async removeMarkedForDeleting(): Promise<void> {
        const users = await this.userRepository.getUsersForDeletingMarkedDeletedAt();
        users.forEach((user) => {
            if (user.role === UserRole.Doctor) {
                console.log(user);
                this.removeDoctorService.delete(user);
            } else {
                this.removeCaregiverOrPatientService.delete(user);
            }
        });
    }
}
