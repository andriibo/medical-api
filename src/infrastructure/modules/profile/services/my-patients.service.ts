import {Inject} from '@nestjs/common';
import {IMyPatientsService} from 'app/modules/profile/services/my-patients.service';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {sortUserDtosByName} from 'app/support/sort.helper';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';

export class MyPatientsService implements IMyPatientsService {
    public constructor(
        @Inject(IPatientCategoryRepository) private readonly patientCategoryRepository: IPatientCategoryRepository,
        @Inject(UserDtoMapper) private readonly userDtoMapper: UserDtoMapper,
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
            const dto = this.userDtoMapper.mapPatientDtoByUserAndMetadata(
                patientDataAccess.patientUser,
                patientDataAccess.patientUser.patientMetadata,
            ) as MyPatientDto;
            dto.accessId = patientDataAccess.id;
            dto.lastConnected = null;
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
