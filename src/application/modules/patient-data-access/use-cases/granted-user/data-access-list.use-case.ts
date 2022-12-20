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
        const doctor = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getByGrantedUser(doctor);

        const users = await this.getPatients(items);

        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.id] = user));

        const dataAccesses = items.map((item) => {
            const dto = DataAccessDto.fromPatientDataAccess(item);
            if (item.patientUserId in indexedUsers) {
                const user = UserDto.fromUser(indexedUsers[item.patientUserId]);
                user.avatar = this.fileUrlService.createUrlToUserAvatar(user.avatar);
                dto.requestedUser = user;
            } else if (item.patientEmail) {
                dto.requestedUser = UserDto.fromEmail(item.patientEmail);
            }

            return dto;
        });

        return sortDataAccessDtosByCreatedAtDesc(dataAccesses);
    }

    private async getPatients(items: PatientDataAccess[]): Promise<User[]> {
        const userIds = items.map((item) => item.patientUserId);

        return await this.userRepository.getByIds(userIds);
    }
}
