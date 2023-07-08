import {IUserRepository} from 'app/modules/auth/repositories';
import {IRemoveUserService} from 'app/modules/profile/services/remove-user.service';
import {User} from 'domain/entities/user.entity';
import {UserRoleEnum} from 'domain/constants/user.const';

export class RemoveUsersUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly removeDoctorService: IRemoveUserService,
        private readonly removeCaregiverOrPatientService: IRemoveUserService,
    ) {}

    public async removeMarkedForDeleting(): Promise<void> {
        const users = await this.userRepository.getUsersForDeletingMarkedDeletedAt();
        users.forEach((user) => {
            this.removeUser(user);
        });
    }

    private async removeUser(user: User): Promise<void> {
        if (user.role === UserRoleEnum.Doctor) {
            await this.removeDoctorService.remove(user);
        } else {
            await this.removeCaregiverOrPatientService.remove(user);
        }
    }
}
