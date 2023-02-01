import {Inject} from '@nestjs/common';
import {IMyPatientsService} from 'app/modules/profile/services/my-patients.service';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {IVitalRepository} from 'app/modules/vitals/repositories';
import {sortUserDtosByName} from 'app/support/sort.helper';

export class MyPatientsService implements IMyPatientsService {
    public constructor(
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(IPatientCategoryRepository) private readonly patientCategoryRepository: IPatientCategoryRepository,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
        @Inject(IVitalRepository) private readonly vitalRepository: IVitalRepository,
    ) {}

    public async getMyPatients(dataAccesses: PatientDataAccess[]): Promise<MyPatientDto[]> {
        if (!dataAccesses.length) {
            return [];
        }
        const patientIds = dataAccesses.map((item) => item.patientUserId);
        const indexedUsersLastConnectionTime = await this.getIndexedUsersLastConnectionTime(patientIds);
        const grantedUserId = dataAccesses[0].grantedUserId;
        const indexedPatientCategories = await this.getIndexedPatientCategories(patientIds, grantedUserId);
        const myPatients = dataAccesses.map((patientDataAccess) => {
            const dto = MyPatientDto.fromUserAndPatientMetadata(
                patientDataAccess.patientUser,
                patientDataAccess.patientUser.patientMetadata,
            );
            dto.avatar = this.fileUrlService.createUrlToUserAvatar(dto.avatar);
            dto.accessId = patientDataAccess.id;
            if (patientDataAccess.patientUserId in indexedUsersLastConnectionTime) {
                dto.lastConnected = indexedUsersLastConnectionTime[patientDataAccess.patientUserId];
            }
            dto.category = indexedPatientCategories[patientDataAccess.patientUserId];

            return dto;
        });

        return sortUserDtosByName(myPatients) as MyPatientDto[];
    }

    private async getIndexedUsersLastConnectionTime(patientIds: string[]): Promise<object> {
        const usersLastConnectionTime = await this.vitalRepository.getLastConnectionTimeByUserIds(patientIds);
        const indexedUsersLastConnectionTime = {};
        usersLastConnectionTime.map(
            (userLastConnectionTime) =>
                (indexedUsersLastConnectionTime[userLastConnectionTime.userId] = userLastConnectionTime.timestamp),
        );

        return indexedUsersLastConnectionTime;
    }

    private async getIndexedPatientCategories(patientIds: string[], grantedUserId: string): Promise<object> {
        const patientCategories = await this.patientCategoryRepository.getByPatientUserIdsAndGrantedUserId(
            patientIds,
            grantedUserId,
        );
        const indexedPatientCategories = {};
        patientCategories.map(
            (patientCategory) =>
                (indexedPatientCategories[patientCategory.patientUserId] = patientCategory.patientCategory),
        );

        return indexedPatientCategories;
    }
}
