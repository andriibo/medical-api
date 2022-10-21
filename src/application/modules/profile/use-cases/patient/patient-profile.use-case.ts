import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
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
