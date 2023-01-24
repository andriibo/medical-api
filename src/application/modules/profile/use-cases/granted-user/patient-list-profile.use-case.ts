import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccess, PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {sortUserDtosByName} from 'app/support/sort.helper';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {IVitalRepository} from 'app/modules/vitals/repositories';
import {UserLastConnectionTime} from 'domain/entities/user-last-connection-time';

export class PatientListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly fileUrlService: IFileUrlService,
        private readonly vitalRepository: IVitalRepository,
    ) {}

    public async getMyPatientList(): Promise<MyPatientDto[]> {
        const user = await this.authedUserService.getUser();

        const items = await this.patientDataAccessRepository.getByGrantedUserIdAndStatus(
            user.id,
            PatientDataAccessStatus.Approved,
        );
        const vitals = await this.getVitals(items);
        const usersLastConnected = {};
        vitals.map((vital) => (usersLastConnected[vital.userId] = vital.timestamp));
        const myPatients = items.map((patientDataAccess) => {
            const dto = MyPatientDto.fromUserAndPatientMetadata(
                patientDataAccess.patientUser,
                patientDataAccess.patientUser.patientMetadata,
            );
            dto.avatar = this.fileUrlService.createUrlToUserAvatar(dto.avatar);
            dto.accessId = patientDataAccess.id;
            if (patientDataAccess.patientUserId in usersLastConnected) {
                dto.lastConnected = usersLastConnected[patientDataAccess.patientUserId];
            } else {
                dto.lastConnected = null;
            }

            return dto;
        });

        return sortUserDtosByName(myPatients) as MyPatientDto[];
    }

    private async getVitals(items: PatientDataAccess[]): Promise<UserLastConnectionTime[]> {
        const userIds = items.map((item) => item.patientUserId);

        return await this.vitalRepository.getLastConnectionTimeByUserIds(userIds);
    }
}
