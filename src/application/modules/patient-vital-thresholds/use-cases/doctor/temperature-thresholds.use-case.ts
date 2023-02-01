import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-max-threshold.dto';

export class TemperatureThresholdsUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly thresholdsRepository: IPatientVitalThresholdsRepository,
        private readonly thresholdsMapper: IPatientVitalThresholdsEntityMapper,
        private readonly thresholdsSpecification: PatientVitalThresholdsSpecification,
    ) {}

    public async createNewThresholds(patientUserId: string, dto: MinMaxThresholdDto): Promise<void> {
        const doctor = await this.authedUserService.getUser();
        await this.thresholdsSpecification.assertGrantedUserCanOperateThreshold(doctor, patientUserId);

        const patientThresholds = await this.thresholdsRepository.getCurrentThresholdsByPatientUserId(patientUserId);
        const modifiedPatientThresholds = this.thresholdsMapper.mapByMinMaxTemperatureDto(
            dto,
            patientThresholds,
            doctor,
        );
        modifiedPatientThresholds.patientUserId = patientUserId;

        await this.thresholdsRepository.insert(modifiedPatientThresholds);
    }
}
