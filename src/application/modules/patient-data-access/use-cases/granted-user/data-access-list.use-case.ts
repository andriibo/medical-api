import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';

export class DataAccessListUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly userDtoService: UserDtoService,
    ) {}

    public async getList(): Promise<DataAccessDto[]> {
        const grantedUser = await this.authedUserService.getUser();
        const items = await this.patientDataAccessRepository.getWithPatientUserByGrantedUserId(grantedUser.id);

        return items.map((item) => {
            const dto = DataAccessDto.fromPatientDataAccess(item);
            if (item.patientUser) {
                dto.requestedUser = this.userDtoService.createUserDtoByUser(item.patientUser);
            } else if (item.patientEmail) {
                dto.requestedUser = this.userDtoService.createUserDtoByEmail(item.patientEmail);
            }

            return dto;
        });
    }
}
