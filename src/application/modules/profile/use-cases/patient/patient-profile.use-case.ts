import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';

export class PatientProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientMetadataRepository: IPatientMetadataRepository,
        private readonly userDtoService: UserDtoService,
    ) {}

    public async getProfileInfo(): Promise<PatientDto> {
        const user = await this.authedUserService.getUser();
        const patientMetadata = await this.patientMetadataRepository.getOneById(user.id);

        return this.userDtoService.createPatientDtoByUserAndMetadata(user, patientMetadata);
    }
}
