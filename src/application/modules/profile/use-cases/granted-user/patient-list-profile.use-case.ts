import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';
import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {sortUserDtosByName} from 'app/support/sort.helper';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';

export class PatientListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientMetadataRepository: IPatientMetadataRepository,
        private readonly userRepository: IUserRepository,
        private readonly fileUrlService: IFileUrlService,
    ) {}

    public async getMyPatientList(): Promise<MyPatientDto[]> {
        const user = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getByGrantedUserIdAndStatus(
            user.id,
            PatientDataAccessStatus.Approved,
        );

        const patientIds = items.filter((item) => item.patientUserId).map((item) => item.patientUserId);
        const indexedMetadataForPatients = await this.getIndexedMetadata(patientIds);

        const myPatients = items.map((patientDataAccess) => {
            const metadata = indexedMetadataForPatients[patientDataAccess.patientUserId];

            const dto = MyPatientDto.fromUserAndPatientMetadata(patientDataAccess.patientUser, metadata);
            dto.avatar = this.fileUrlService.createUrlToUserAvatar(dto.avatar);
            dto.accessId = patientDataAccess.id;

            return dto;
        });

        return sortUserDtosByName(myPatients) as MyPatientDto[];
    }

    private async getIndexedMetadata(patientIds: string[]): Promise<object> {
        const metadataForPatients = await this.patientMetadataRepository.getByIds(patientIds);
        const indexedMetadataForPatients = {};
        metadataForPatients.map((metadata) => (indexedMetadataForPatients[metadata.userId] = metadata));

        return indexedMetadataForPatients;
    }
}
