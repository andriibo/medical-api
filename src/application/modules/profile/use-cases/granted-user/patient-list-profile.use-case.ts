import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccess, PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {sortUserDtosByName} from 'app/support/sort.helper';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {Vital} from 'domain/entities';
import {IVitalRepository} from 'app/modules/vitals/repositories';

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
        const lastConnectedUsers = {};
        vitals.map((vital) => (lastConnectedUsers[vital.user_id] = vital.timestamp));
        const myPatients = items.map((patientDataAccess) => {
            const dto = MyPatientDto.fromUserAndPatientMetadata(
                patientDataAccess.patientUser,
                patientDataAccess.patientUser.patientMetadata,
            );
            dto.avatar = this.fileUrlService.createUrlToUserAvatar(dto.avatar);
            dto.accessId = patientDataAccess.id;
            if (patientDataAccess.patientUserId in lastConnectedUsers) {
                dto.lastConnected = lastConnectedUsers[patientDataAccess.patientUserId];
            } else {
                dto.lastConnected = null;
            }

            return dto;
        });

        return sortUserDtosByName(myPatients) as MyPatientDto[];
    }

    private async getVitals(items: PatientDataAccess[]): Promise<{user_id: string; timestamp: number}[]> {
        const userIds = items.map((item) => item.patientUserId);

        return await this.vitalRepository.getLastVitalsByUserIds(userIds);
    }
}
