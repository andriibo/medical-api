import {Inject} from '@nestjs/common';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {PatientCategoryEnum} from 'domain/entities/patient-category.entity';
import {currentUnixTimestamp} from 'app/support/date.helper';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {EntityNotFoundError} from 'app/errors';
import {IDataAccessApprovedService} from 'app/modules/patient-data-access/services/data-access-approved.service';

export class DataAccessApprovedService implements IDataAccessApprovedService {
    public constructor(
        @Inject(IPatientStatusRepository)
        private readonly patientStatusRepository: IPatientStatusRepository,
        @Inject(IPatientCategoryRepository)
        private readonly patientCategoryRepository: IPatientCategoryRepository,
    ) {}

    public async handle(dataAccess: PatientDataAccess): Promise<void> {
        const patientStatus = await this.patientStatusRepository.getByPatientUserId(dataAccess.patientUserId);
        if (patientStatus === null) {
            throw new EntityNotFoundError('PatientStatus Not Found.');
        }
        await this.patientCategoryRepository.updateCategoryAndUpdatedAtById(
            patientStatus.status as PatientCategoryEnum,
            currentUnixTimestamp(),
            dataAccess.id,
        );
    }
}
