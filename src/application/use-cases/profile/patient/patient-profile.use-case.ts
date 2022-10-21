import {IUserRepository, IPatientMetadataRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';

export class PatientProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly patientMetadataRepository: IPatientMetadataRepository,
    ) {}

    public async getProfileInfo(): Promise<PatientDto> {
        const user = await this.authedUserService.getUser();
        const patientMetadata = await this.patientMetadataRepository.getOneById(user.id);

        return PatientDto.fromUserAndPatientMetadata(user, patientMetadata);
    }
}
