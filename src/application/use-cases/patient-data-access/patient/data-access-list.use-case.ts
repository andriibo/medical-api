import {IPatientDataAccessRepository, IUserRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {PatientDataAccess, User} from 'domain/entities';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class DataAccessListUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
    ) {}

    public async getList(): Promise<DataAccessDto[]> {
        const patient = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getByPatient(patient);

        const users = await this.getGrantedUsers(items);

        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.id] = user));

        return items.map((item) => {
            const dto = DataAccessDto.fromPatientDataAccess(item);

            if (item.grantedUserId in indexedUsers) {
                dto.requestedUser = UserDto.fromUser(indexedUsers[item.grantedUserId]);
            }

            return dto;
        });
    }

    private async getGrantedUsers(items: PatientDataAccess[]): Promise<User[]> {
        const userIds = items.filter((item) => item.grantedUserId).map((item) => item.grantedUserId);

        return await this.userRepository.getByIds(userIds);
    }
}
