import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';
import {UserDto} from 'domain/dtos/response/user/user.dto';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';

export class DataAccessListUseCase {
    public constructor(
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly fileUrlService: IFileUrlService,
    ) {}

    public async getList(): Promise<DataAccessDto[]> {
        const patient = await this.authedUserService.getUser();
        const items = await this.patientDataAccessRepository.getWithGrantedUserByPatientUserId(patient.id);

        return items.map((item) => {
            const dto = DataAccessDto.fromPatientDataAccess(item);

            if (item.grantedUser) {
                const user = UserDto.fromUser(item.grantedUser);
                user.avatar = this.fileUrlService.createUrlToUserAvatar(user.avatar);
                dto.requestedUser = user;
            } else if (item.grantedEmail) {
                dto.requestedUser = UserDto.fromEmail(item.grantedEmail);
            }

            return dto;
        });
    }
}
