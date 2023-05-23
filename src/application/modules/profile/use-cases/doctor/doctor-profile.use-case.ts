import {IDoctorMetadataRepository} from 'app/modules/profile/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {DoctorDto} from 'domain/dtos/response/profile/doctor.dto';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';

export class DoctorProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly doctorMetadataRepository: IDoctorMetadataRepository,
        private readonly userDtoMapper: UserDtoMapper,
    ) {}

    public async getProfileInfo(): Promise<DoctorDto> {
        const user = await this.authedUserService.getUser();
        const doctorMetadata = await this.doctorMetadataRepository.getOneById(user.id);

        return this.userDtoMapper.mapDoctorDtoByUserAndMetadata(user, doctorMetadata);
    }
}
