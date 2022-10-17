import {IPatientDataAccessRepository, IUserRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {PatientDataAccess, User} from 'domain/entities';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class DataAccessListUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
    ) {}

    public async getList(): Promise<DataAccessDto[]> {
        const patient = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getByPatient(patient);

        const users = await this.getGrantedUsers(items);

        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.userId] = user));

        return items.map((item) => {
            const view = DataAccessDto.fromPatientDataAccess(item);
            view.requestedUser = UserDto.fromUser(indexedUsers[item.grantedUserId]);

            return view;
        });
    }

    private async getGrantedUsers(items: PatientDataAccess[]): Promise<User[]> {
        const userIds = items.map((item) => item.grantedUserId);

        return await this.userRepository.getByUserIds(userIds);
    }
}
