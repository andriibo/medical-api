import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {ThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/thresholds.dto';
import {IThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';

export class ThresholdListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientVitalThresholdsRepository: IPatientVitalThresholdsRepository,
        private readonly thresholdSpecification: PatientVitalThresholdsSpecification,
        private readonly vitalRepository: IVitalRepository,
        private readonly thresholdsDtoService: IThresholdsDtoService,
    ) {}

    public async getList(patientUserId: string): Promise<ThresholdsDto> {
        const grantedUser = await this.authedUserService.getUser();
        await this.thresholdSpecification.assertGrantedUserCanOperateThresholds(grantedUser, patientUserId);

        const thresholds = await this.patientVitalThresholdsRepository.getCurrentThresholdsByPatientUserId(
            patientUserId,
        );

        const thresholdsDto = await this.thresholdsDtoService.createDtoByThresholds([thresholds]);
        const vitalsQuantity = await this.vitalRepository.countByThresholdsId(thresholds.id);
        thresholdsDto.thresholds[0].isPending = !vitalsQuantity;

        return thresholdsDto;
    }
}
