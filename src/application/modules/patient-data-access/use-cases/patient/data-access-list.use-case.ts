import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccess, User} from 'domain/entities';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';
import {UserDto} from 'domain/dtos/response/user/user.dto';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {sortDataAccessDtosByCreatedAtDesc} from 'app/support/sort.helper';

export class DataAccessListUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly fileUrlService: IFileUrlService,
    ) {}

    public async getList(): Promise<DataAccessDto[]> {
        const patient = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getByPatient(patient);

        const users = await this.getGrantedUsers(items);

        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.id] = user));

        const dataAccesses = items.map((item) => {
            const dto = DataAccessDto.fromPatientDataAccess(item);

            if (item.grantedUserId in indexedUsers) {
                const user = UserDto.fromUser(indexedUsers[item.grantedUserId]);
                user.avatar = this.fileUrlService.createUrlToUserAvatar(user.avatar);
                dto.requestedUser = user;
            } else if (item.grantedEmail) {
                dto.requestedUser = UserDto.fromEmail(item.grantedEmail);
            }

            return dto;
        });

        return sortDataAccessDtosByCreatedAtDesc(dataAccesses);
    }

    private async getGrantedUsers(items: PatientDataAccess[]): Promise<User[]> {
        const userIds = items.filter((item) => item.grantedUserId).map((item) => item.grantedUserId);

        return await this.userRepository.getByIds(userIds);
    }
}
