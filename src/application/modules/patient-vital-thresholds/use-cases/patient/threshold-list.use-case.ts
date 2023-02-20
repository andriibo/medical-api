import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {ThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/thresholds.dto';
import {ThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';

export class ThresholdListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly thresholdRepository: IPatientVitalThresholdsRepository,
        private readonly vitalRepository: IVitalRepository,
        private readonly thresholdsDtoService: ThresholdsDtoService,
    ) {}

    public async getList(): Promise<ThresholdsDto> {
        const user = await this.authedUserService.getUser();

        const thresholds = await this.thresholdRepository.getCurrentThresholdsByPatientUserId(user.id);

        const thresholdsDto = await this.thresholdsDtoService.createDtoByThresholds([thresholds]);
        const vitalsQuantity = await this.vitalRepository.countByThresholdsId(thresholds.id);
        thresholdsDto.thresholds[0].isPending = !vitalsQuantity;

        return thresholdsDto;
    }
}
