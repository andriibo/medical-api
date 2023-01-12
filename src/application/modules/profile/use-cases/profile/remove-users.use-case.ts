import {IUserRepository} from 'app/modules/auth/repositories';
import {IRemoveUserService} from 'app/modules/profile/services/remove-user.service';
import {User, UserRole} from 'domain/entities/user.entity';

export class RemoveUsersUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly removeCaregiverOrPatientService: IRemoveUserService,
        private readonly removeDoctorService: IRemoveUserService,
    ) {}

    public async removeMarkedForDeleting(): Promise<void> {
        const users = await this.userRepository.getUsersForDeletingMarkedDeletedAt();
        users.forEach((user) => {
            this.removeUser(user);
        });
    }

    private removeUser(user: User): void {
        if (user.role === UserRole.Doctor) {
            this.removeDoctorService.delete(user);
        } else {
            this.removeCaregiverOrPatientService.delete(user);
        }
    }
}
