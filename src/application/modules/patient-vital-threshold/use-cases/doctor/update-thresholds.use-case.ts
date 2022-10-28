import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientVitalThreshold, VitalThresholdName} from 'domain/entities/patient-vital-threshold.entity';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdSpecification} from 'app/modules/patient-vital-threshold/specifications/patient-vital-threshold.specification';
import {IPatientVitalThresholdMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-threshold-entity.mapper';
import {getFirstByPropValue} from 'app/support/array.helper';
import {currentUnixTimestamp} from 'app/support/date.helper';

export interface ThresholdNameToPropNamePair {
    thresholdName: VitalThresholdName;
    dtoPropName: string;
}

export class UpdateThresholdsUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly thresholdRepository: IPatientVitalThresholdRepository,
        private readonly thresholdMapper: IPatientVitalThresholdMapper,
        private readonly thresholdSpecification: PatientVitalThresholdSpecification,
        private readonly thresholdNameToPropNamePairs: ThresholdNameToPropNamePair[],
    ) {}

    public async updateThreshold(patientUserId: string, dto: object): Promise<void> {
        const user = await this.authedUserService.getUser();

        await this.thresholdSpecification.assertUserCanUpdateThreshold(user, patientUserId);

        const thresholds = await this.getPatientThresholds(patientUserId);

        const modifiedThresholds = this.thresholdNameToPropNamePairs.map((pair) => {
            let threshold = getFirstByPropValue(thresholds, 'thresholdName', pair.thresholdName);

            threshold = this.thresholdMapper.mapByValue(dto[pair.dtoPropName], threshold);
            threshold.patientUserId = patientUserId;
            threshold.thresholdName = pair.thresholdName;
            threshold.setBy = user.id;
            threshold.setAt = currentUnixTimestamp();

            return threshold;
        });

        await this.thresholdRepository.persist(modifiedThresholds);
    }

    private async getPatientThresholds(patientUserId: string): Promise<PatientVitalThreshold[]> {
        return await this.thresholdRepository.getByPatientUserId(patientUserId);
    }
}
