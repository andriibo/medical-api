import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientVitalThreshold, VitalThresholdName} from 'domain/entities/patient-vital-threshold.entity';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdSpecification} from 'app/modules/patient-vital-threshold/specifications/patient-vital-threshold.specification';
import {IPatientVitalThresholdEntityMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-threshold-entity.mapper';
import {getFirstByPropValue} from 'app/support/array.helper';
import {currentUnixTimestamp} from 'app/support/date.helper';

export interface IDtoPropToThresholdNameMap {
    dtoPropName: string;
    thresholdName: VitalThresholdName;
}

export const DtoPropToThresholdNameMaps = {
    bloodPressure: [
        {
            thresholdName: VitalThresholdName.MinDBP,
            dtoPropName: 'minDBP',
        },
        {
            thresholdName: VitalThresholdName.MaxDBP,
            dtoPropName: 'maxDBP',
        },
        {
            thresholdName: VitalThresholdName.MinSBP,
            dtoPropName: 'minSBP',
        },
        {
            thresholdName: VitalThresholdName.MaxSBP,
            dtoPropName: 'maxSBP',
        },
    ],
    heartRate: [
        {
            thresholdName: VitalThresholdName.MinHR,
            dtoPropName: 'min',
        },
        {
            thresholdName: VitalThresholdName.MaxHR,
            dtoPropName: 'max',
        },
    ],
    meanArterialPressure: [
        {
            thresholdName: VitalThresholdName.MinMAP,
            dtoPropName: 'min',
        },
        {
            thresholdName: VitalThresholdName.MaxMAP,
            dtoPropName: 'max',
        },
    ],
    oxygenSaturation: [
        {
            thresholdName: VitalThresholdName.MinSpO2,
            dtoPropName: 'min',
        },
    ],
    respirationRate: [
        {
            thresholdName: VitalThresholdName.MinRR,
            dtoPropName: 'min',
        },
        {
            thresholdName: VitalThresholdName.MaxRR,
            dtoPropName: 'max',
        },
    ],
    temperature: [
        {
            thresholdName: VitalThresholdName.MinTemp,
            dtoPropName: 'min',
        },
        {
            thresholdName: VitalThresholdName.MaxTemp,
            dtoPropName: 'max',
        },
    ],
};

export class UpdateThresholdsUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly thresholdRepository: IPatientVitalThresholdRepository,
        private readonly thresholdMapper: IPatientVitalThresholdEntityMapper,
        private readonly thresholdSpecification: PatientVitalThresholdSpecification,
        private readonly dtoPropToThresholdNameMap: IDtoPropToThresholdNameMap[],
    ) {}

    public async updateThreshold(patientUserId: string, dto: object): Promise<void> {
        const user = await this.authedUserService.getUser();

        await this.thresholdSpecification.assertGrantedUserCanOperateThreshold(user, patientUserId);

        const thresholds = await this.getPatientThresholds(patientUserId);

        const modifiedThresholds = this.dtoPropToThresholdNameMap.map((item) => {
            let threshold = getFirstByPropValue(thresholds, 'thresholdName', item.thresholdName);

            threshold = this.thresholdMapper.mapByValue(dto[item.dtoPropName], threshold);
            threshold.patientUserId = patientUserId;
            threshold.thresholdName = item.thresholdName;
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
