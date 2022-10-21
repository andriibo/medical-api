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
        const doctor = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getByGrantedUser(doctor);

        const users = await this.getPatients(items);

        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.id] = user));

        return items.map((item) => {
            const dto = DataAccessDto.fromPatientDataAccess(item);
            dto.requestedUser = UserDto.fromUser(indexedUsers[item.patientUserId]);

            return dto;
        });
    }

    private async getPatients(items: PatientDataAccess[]): Promise<User[]> {
        const userIds = items.map((item) => item.patientUserId);

        return await this.userRepository.getByIds(userIds);
    }
}
