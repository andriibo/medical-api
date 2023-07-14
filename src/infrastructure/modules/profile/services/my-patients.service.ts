import {Inject} from '@nestjs/common';
import {IMyPatientsService} from 'app/modules/profile/services/my-patients.service';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {sortUserDtosByName} from 'support/sort.helper';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';

export class MyPatientsService implements IMyPatientsService {
    public constructor(
        @Inject(IPatientStatusRepository) private readonly patientStatusRepository: IPatientStatusRepository,
        @Inject(UserDtoMapper) private readonly userDtoMapper: UserDtoMapper,
        @Inject(IVitalRepository) private readonly vitalRepository: IVitalRepository,
    ) {}

    public async getMyPatients(dataAccesses: PatientDataAccess[]): Promise<MyPatientDto[]> {
        if (!dataAccesses.length) {
            return [];
        }
        const patientIds = dataAccesses.map((item) => item.patientUserId);
        const indexedUsersLastConnectionTime = await this.getIndexedUsersLastConnectionTime(patientIds);
        const indexedPatientStatuses = await this.getIndexedPatientStatuses(patientIds);
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
            dto.status = indexedPatientStatuses[patientDataAccess.patientUserId];

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

    private async getIndexedPatientStatuses(patientIds: string[]): Promise<object> {
        const patientStatuses = await this.patientStatusRepository.getByPatientUserIds(patientIds);

        const indexedPatientStatuses = {};
        patientStatuses.map(
            (patientStatus) => (indexedPatientStatuses[patientStatus.patientUserId] = patientStatus.status),
        );

        return indexedPatientStatuses;
    }
}
