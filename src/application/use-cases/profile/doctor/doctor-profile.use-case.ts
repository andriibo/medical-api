import {IDoctorMetadataRepository, IUserRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {DoctorDto} from 'domain/dtos/response/profile/doctor.dto';

export class DoctorProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly doctorMetadataRepository: IDoctorMetadataRepository,
    ) {}

    public async getProfileInfo(): Promise<DoctorDto> {
        const user = await this.authedUserService.getUser();
        const doctorMetadata = await this.doctorMetadataRepository.getOneById(user.id);

        return DoctorDto.fromUserAndDoctorMetadata(user, doctorMetadata);
    }
}
