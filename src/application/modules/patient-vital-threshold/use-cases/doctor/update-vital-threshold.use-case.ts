import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientVitalThreshold, VitalThresholdName} from 'domain/entities/patient-vital-threshold.entity';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdSpecification} from 'app/modules/patient-vital-threshold/specifications/patient-vital-threshold.specification';
import {IPatientVitalThresholdMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-threshold-entity.mapper';

export class UpdateHeartRateUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientVitalThresholdRepository: IPatientVitalThresholdRepository,
        private readonly patientVitalThresholdMapper: IPatientVitalThresholdMapper,
        private readonly patientVitalThresholdSpecification: PatientVitalThresholdSpecification,
    ) {}

    public async updateHeartRate(patientUserId: string, dto: MinMaxThresholdDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const thresholds = await this.getThresholds(patientUserId);
    }

    private async getThresholds(patientUserId: string): Promise<PatientVitalThreshold[]> {
        return await this.patientVitalThresholdRepository.getByPatientUserIdAndThresholdNames(patientUserId, [
            VitalThresholdName.MinHR,
            VitalThresholdName.MaxHR,
        ]);
    }
}
