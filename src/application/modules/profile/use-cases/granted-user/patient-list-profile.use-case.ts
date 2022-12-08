import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';
import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {sortUserDtosByName} from 'app/support/sort.helper';

export class PatientListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientMetadataRepository: IPatientMetadataRepository,
        private readonly userRepository: IUserRepository,
    ) {}

    public async getMyPatientList(): Promise<MyPatientDto[]> {
        const user = await this.authedUserService.getUser();
        const items = await this.patientDataAccessRepository.getByGrantedUserIdAndStatus(
            user.id,
            PatientDataAccessStatus.Approved,
        );

        const patientIds = items.filter((item) => item.patientUserId).map((item) => item.patientUserId);
        const indexedPatients = await this.getIndexedPatients(patientIds);
        const indexedMetadataForPatients = await this.getIndexedMetadata(patientIds);

        const myPatients = items.map((patientDataAccess) => {
            const patient = indexedPatients[patientDataAccess.patientUserId];
            const metadata = indexedMetadataForPatients[patientDataAccess.patientUserId];

            const dto = MyPatientDto.fromUserAndPatientMetadata(patient, metadata);
            dto.accessId = patientDataAccess.id;

            return dto;
        });

        return sortUserDtosByName(myPatients);
    }

    private async getIndexedPatients(patientIds: string[]): Promise<object> {
        const patients = await this.userRepository.getByIds(patientIds);
        const indexedPatients = {};
        patients.map((user) => (indexedPatients[user.id] = user));

        return indexedPatients;
    }

    private async getIndexedMetadata(patientIds: string[]): Promise<object> {
        const metadataForPatients = await this.patientMetadataRepository.getByIds(patientIds);
        const indexedMetadataForPatients = {};
        metadataForPatients.map((metadata) => (indexedMetadataForPatients[metadata.userId] = metadata));

        return indexedMetadataForPatients;
    }
}
