import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';
import {ThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';
import {IVitalRepository} from 'app/modules/vital/repositories';

export class ThresholdListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly thresholdRepository: IPatientVitalThresholdsRepository,
        private readonly thresholdsDtoService: ThresholdsDtoService,
        private readonly vitalRepository: IVitalRepository,
    ) {}

    public async getList(): Promise<PatientVitalThresholdsDto> {
        const user = await this.authedUserService.getUser();

        const thresholds = await this.thresholdRepository.getCurrentThresholdsByPatientUserId(user.id);
        const vitalsCount = this.vitalRepository.getCountByThresholdsId(thresholds.id);

        const dto = await this.thresholdsDtoService.createDtoByThresholds(thresholds);
        dto.isPending = !vitalsCount;

        return dto;
    }
}
