import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccess, PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {sortUserDtosByName} from 'app/support/sort.helper';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {IVitalRepository} from 'app/modules/vitals/repositories';
import {IPatientRelationshipRepository} from 'app/modules/patient-relationship/repositories';

export class PatientListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientRelationshipRepository: IPatientRelationshipRepository,
        private readonly fileUrlService: IFileUrlService,
        private readonly vitalRepository: IVitalRepository,
    ) {}

    public async getMyPatientList(): Promise<MyPatientDto[]> {
        const grantedUser = await this.authedUserService.getUser();

        const items = await this.patientRelationshipRepository.getByGrantedUserIdAndStatus(
            grantedUser.id,
            PatientDataAccessStatus.Approved,
        );

        const indexedUsersLastConnectionTime = await this.getIndexedUsersLastConnectionTime(items);
        const myPatients = items.map((patientDataAccess) => {
            const dto = MyPatientDto.fromUserAndPatientMetadata(
                patientDataAccess.patientUser,
                patientDataAccess.patientUser.patientMetadata,
            );
            dto.avatar = this.fileUrlService.createUrlToUserAvatar(dto.avatar);
            dto.accessId = patientDataAccess.id;
            dto.category = patientDataAccess.patientCategory;
            if (patientDataAccess.patientUserId in indexedUsersLastConnectionTime) {
                dto.lastConnected = indexedUsersLastConnectionTime[patientDataAccess.patientUserId];
            }

            return dto;
        });

        return sortUserDtosByName(myPatients) as MyPatientDto[];
    }

    private async getIndexedUsersLastConnectionTime(items: PatientDataAccess[]): Promise<object> {
        const userIds = items.map((item) => item.patientUserId);
        const usersLastConnectionTime = await this.vitalRepository.getLastConnectionTimeByUserIds(userIds);
        const indexedUsersLastConnectionTime = {};
        usersLastConnectionTime.map(
            (userLastConnectionTime) =>
                (indexedUsersLastConnectionTime[userLastConnectionTime.userId] = userLastConnectionTime.timestamp),
        );

        return indexedUsersLastConnectionTime;
    }
}
