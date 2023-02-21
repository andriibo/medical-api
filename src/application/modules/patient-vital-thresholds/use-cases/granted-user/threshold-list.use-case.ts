import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {ThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';
import {CurrentPatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/current-patient-vital-thresholds.dto';

export class ThresholdListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientVitalThresholdsRepository: IPatientVitalThresholdsRepository,
        private readonly thresholdSpecification: PatientVitalThresholdsSpecification,
        private readonly vitalRepository: IVitalRepository,
        private readonly thresholdsDtoService: ThresholdsDtoService,
    ) {}

    public async getList(patientUserId: string): Promise<CurrentPatientVitalThresholdsDto> {
        const grantedUser = await this.authedUserService.getUser();
        await this.thresholdSpecification.assertGrantedUserCanOperateThresholds(grantedUser, patientUserId);

        const thresholds = await this.patientVitalThresholdsRepository.getCurrentThresholdsByPatientUserId(
            patientUserId,
        );

        const thresholdsDto = await this.thresholdsDtoService.createDtoByThresholds([thresholds]);
        const vitalsQuantity = await this.vitalRepository.countByThresholdsId(thresholds.id);

        const dto = new CurrentPatientVitalThresholdsDto();
        dto.threshold = thresholdsDto.thresholds[0];
        dto.users = thresholdsDto.users;
        dto.threshold.isPending = !vitalsQuantity;

        return dto;
    }
}
