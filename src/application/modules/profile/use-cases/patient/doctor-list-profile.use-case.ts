import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccess, User} from 'domain/entities';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';
import {MyDoctorDto} from 'domain/dtos/response/profile/my-doctor.dto';

export class DoctorListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly userRepository: IUserRepository,
    ) {}

    public async getMyDoctorList(): Promise<MyDoctorDto[]> {
        const patient = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getByPatientAndStatus(
            patient,
            PatientDataAccessStatus.Approved,
        );

        const users = await this.getGrantedUsers(items);

        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.id] = user));

        return items.map((item) => {
            const user = indexedUsers[item.grantedUserId];

            return MyDoctorDto.fromUserAndPatientDataAccess(user, item);
        });
    }

    private async getGrantedUsers(items: PatientDataAccess[]): Promise<User[]> {
        const userIds = items.filter((item) => item.grantedUserId).map((item) => item.grantedUserId);

        return await this.userRepository.getByIds(userIds);
    }
}
