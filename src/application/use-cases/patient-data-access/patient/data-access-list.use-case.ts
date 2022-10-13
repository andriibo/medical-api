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
        const patient = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getByPatient(patient);

        const users = await this.getGrantedUsers(items);

        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.userId] = user));

        return items.map((item) => {
            const view = DataAccessView.fromPatientDataAccess(item);
            view.requestedUser = UserView.fromUser(indexedUsers[item.grantedUserId]);

            return view;
        });
    }

    private async getGrantedUsers(items: PatientDataAccess[]): Promise<User[]> {
        const userIds = items.map((item) => item.grantedUserId);

        return await this.userRepository.getByUserIds(userIds);
    }
}
