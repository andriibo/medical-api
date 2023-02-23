import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';

export class DataAccessListUseCase {
    public constructor(
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly userDtoService: UserDtoService,
    ) {}

    public async getList(): Promise<DataAccessDto[]> {
        const patient = await this.authedUserService.getUser();
        const items = await this.patientDataAccessRepository.getWithGrantedUserByPatientUserId(patient.id);

        return items.map((item) => {
            const dto = DataAccessDto.fromPatientDataAccess(item);

            if (item.grantedUser) {
                dto.requestedUser = this.userDtoService.createUserDtoByUser(item.grantedUser);
            } else if (item.grantedEmail) {
                dto.requestedUser = this.userDtoService.createUserDtoByEmail(item.grantedEmail);
            }

            return dto;
        });
    }
}
