import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {MinThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-threshold.dto';

export class OxygenSaturationThresholdUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly thresholdsRepository: IPatientVitalThresholdsRepository,
        private readonly thresholdsMapper: IPatientVitalThresholdsEntityMapper,
        private readonly thresholdsSpecification: PatientVitalThresholdsSpecification,
    ) {}

    public async createNewThreshold(patientUserId: string, dto: MinThresholdDto): Promise<void> {
        const doctor = await this.authedUserService.getUser();
        await this.thresholdsSpecification.assertGrantedUserCanOperateThresholds(doctor, patientUserId);

        const patientThresholds = await this.thresholdsRepository.getCurrentThresholdsByPatientUserId(patientUserId);
        const modifiedPatientThresholds = this.thresholdsMapper.mapByMinOxygenSaturationDto(
            dto,
            patientThresholds,
            doctor,
        );
        modifiedPatientThresholds.patientUserId = patientUserId;

        await this.thresholdsRepository.insert(modifiedPatientThresholds);
    }
}
