import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';
import {MyDoctorDto} from 'domain/dtos/response/profile/my-doctor.dto';
import {IDoctorMetadataRepository} from 'app/modules/profile/repositories';
import {ISortUsersService} from 'app/modules/profile/services/sort-users.service';

export class DoctorListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly doctorMetadataRepository: IDoctorMetadataRepository,
        private readonly userRepository: IUserRepository,
        private readonly sortUsersService: ISortUsersService,
    ) {}

    public async getMyDoctorList(): Promise<MyDoctorDto[]> {
        const patient = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getByPatientUserIdAndStatus(
            patient.id,
            PatientDataAccessStatus.Approved,
        );

        const doctorIds = items.filter((item) => item.grantedUserId).map((item) => item.grantedUserId);
        const indexedDoctors = await this.getIndexedDoctors(doctorIds);
        const indexedMetadataForDoctors = await this.getIndexedMetadata(doctorIds);

        const myDoctors = items.map((patientDataAccess) => {
            const doctor = indexedDoctors[patientDataAccess.grantedUserId];
            const metadata = indexedMetadataForDoctors[patientDataAccess.grantedUserId];

            const dto = MyDoctorDto.fromUserAndDoctorMetadata(doctor, metadata);
            dto.accessId = patientDataAccess.id;

            return dto;
        });

        return this.sortUsersService.byName(myDoctors) as MyDoctorDto[];
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
