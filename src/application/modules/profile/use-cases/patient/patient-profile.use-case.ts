import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';

export class PatientProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientMetadataRepository: IPatientMetadataRepository,
        private readonly userDtoMapper: UserDtoMapper,
    ) {}

    public async getProfileInfo(): Promise<PatientDto> {
        const user = await this.authedUserService.getUser();
        const patientMetadata = await this.patientMetadataRepository.getOneById(user.id);

        return this.userDtoMapper.mapPatientDtoByUserAndMetadata(user, patientMetadata);
    }
}
