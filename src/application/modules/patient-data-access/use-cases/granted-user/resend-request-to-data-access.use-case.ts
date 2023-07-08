import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {PatientDataAccessStatusEnum} from 'domain/constants/patient-data-access.const';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {currentUnixTimestamp} from 'support/date.helper';

export class ResendRequestToDataAccessUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
    ) {}

    public async resendRequest(accessId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const dataAccess = await this.getDataAccess(accessId);

        await this.patientDataAccessSpecification.assertGrantedUserCanResendRequest(user, dataAccess);

        dataAccess.status = PatientDataAccessStatusEnum.Initiated;
        dataAccess.lastInviteSentAt = currentUnixTimestamp();

        await this.patientDataAccessRepository.update(dataAccess);
        await this.patientDataAccessEventEmitter.emitGrantedUserResentRequestToPatient(user, dataAccess);
    }

    private async getDataAccess(accessId: string): Promise<PatientDataAccess> {
        const dataAccess = await this.patientDataAccessRepository.getOneWithPatientUserById(accessId);

        if (dataAccess === null) {
            throw new EntityNotFoundError('Access Not Found.');
        }

        return dataAccess;
    }
}
