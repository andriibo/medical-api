import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';
import {MyDoctorDto} from 'domain/dtos/response/profile/my-doctor.dto';
import {IDoctorMetadataRepository} from 'app/modules/profile/repositories';

export class DoctorListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly doctorMetadataRepository: IDoctorMetadataRepository,
        private readonly userRepository: IUserRepository,
    ) {}

    public async getMyDoctorList(): Promise<MyDoctorDto[]> {
        const patient = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getByPatientUserIdAndStatus(
            patient.id,
            PatientDataAccessStatus.Approved,
        );

        const doctorIds = items.filter((item) => item.grantedUserId).map((item) => item.grantedUserId);
        const indexedDoctors = this.getIndexedDoctors(doctorIds);
        const indexedMetadataForDoctors = this.getIndexedMetadata(doctorIds);

        return items.map((patientDataAccess) => {
            const doctor = indexedDoctors[patientDataAccess.grantedUserId];
            const metadata = indexedMetadataForDoctors[patientDataAccess.grantedUserId];

            return MyDoctorDto.fromUserAndDoctorMetadataAndPatientDataAccess(doctor, metadata, patientDataAccess);
        });
    }

    private async getIndexedDoctors(doctorIds: string[]): Promise<object> {
        const doctors = await this.userRepository.getByIds(doctorIds);
        const indexedDoctors = {};
        doctors.map((user) => (indexedDoctors[user.id] = user));

        return indexedDoctors;
    }

    private async getIndexedMetadata(doctorIds: string[]): Promise<object> {
        const metadataForDoctors = await this.doctorMetadataRepository.getByIds(doctorIds);
        const indexedMetadataForDoctors = {};
        metadataForDoctors.map((metadata) => (indexedMetadataForDoctors[metadata.userId] = metadata));

        return indexedMetadataForDoctors;
    }
}
