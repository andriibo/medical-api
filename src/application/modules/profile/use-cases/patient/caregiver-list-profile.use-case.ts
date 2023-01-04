import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';
import {IDoctorMetadataRepository} from 'app/modules/profile/repositories';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {sortUserDtosByName} from 'app/support/sort.helper';
import {MyCaregiverDto} from 'domain/dtos/response/profile/my-caregiver.dto';

export class CaregiverListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly doctorMetadataRepository: IDoctorMetadataRepository,
        private readonly userRepository: IUserRepository,
        private readonly fileUrlService: IFileUrlService,
    ) {}

    public async getMyCaregiverList(): Promise<MyCaregiverDto[]> {
        const patient = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getByPatientUserIdAndStatus(
            patient.id,
            PatientDataAccessStatus.Approved,
        );

        console.log(items);

        const doctorIds = items.filter((item) => item.grantedUserId).map((item) => item.grantedUserId);
        const indexedDoctors = await this.getIndexedDoctors(doctorIds);

        const myDoctors = items.map((patientDataAccess) => {
            const doctor = indexedDoctors[patientDataAccess.grantedUserId];

            const dto = MyCaregiverDto.fromUser(doctor);
            dto.avatar = this.fileUrlService.createUrlToUserAvatar(dto.avatar);
            dto.accessId = patientDataAccess.id;

            return dto;
        });

        return sortUserDtosByName(myDoctors) as MyCaregiverDto[];
    }

    private async getIndexedDoctors(doctorIds: string[]): Promise<object> {
        const doctors = await this.userRepository.getByIds(doctorIds);
        const indexedDoctors = {};
        doctors.map((user) => (indexedDoctors[user.id] = user));

        return indexedDoctors;
    }
}
