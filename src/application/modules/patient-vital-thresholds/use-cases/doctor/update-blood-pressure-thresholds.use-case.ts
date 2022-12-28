import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {BloodPressureThresholdsDto} from 'domain/dtos/request/patient-vital-threshold/blood-pressure-thresholds.dto';

export class UpdateBloodPressureThresholdsUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly thresholdsRepository: IPatientVitalThresholdsRepository,
        private readonly thresholdsMapper: IPatientVitalThresholdsEntityMapper,
        private readonly thresholdsSpecification: PatientVitalThresholdsSpecification,
    ) {}

    public async updateThresholds(patientUserId: string, dto: BloodPressureThresholdsDto): Promise<void> {
        const doctor = await this.authedUserService.getUser();
        await this.thresholdsSpecification.assertGrantedUserCanOperateThreshold(doctor, patientUserId);

        const patientThresholds = await this.thresholdsRepository.getOneByPatientUserId(patientUserId);
        const modifiedPatientThresholds = this.thresholdsMapper.mapByBloodPressureDto(dto, patientThresholds, doctor);
        modifiedPatientThresholds.patientUserId = patientUserId;

        await this.thresholdsRepository.persist(modifiedPatientThresholds);
    }
}
