import {IPatientDataAccessRepository, IUserRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {DataAccessView} from 'views/patient/data-access.view';
import {UserView} from 'views/user/user.view';
import {PatientDataAccess, User} from 'domain/entities';

export class DataAccessListUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
    ) {}

    public async getList(): Promise<DataAccessView[]> {
        const docker = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getByGrantedUser(docker);

        const users = await this.getPatients(items);

        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.userId] = user));

        return items.map((item) => {
            const view = DataAccessView.fromPatientDataAccess(item);
            view.requestedUser = UserView.fromUser(indexedUsers[item.patientUserId]);

            return view;
        });
    }

    private async getPatients(items: PatientDataAccess[]): Promise<User[]> {
        const userIds = items.map((item) => item.patientUserId);

        return await this.userRepository.getByUserIds(userIds);
    }
}
