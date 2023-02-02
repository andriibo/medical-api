import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';
import {ThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';

export class ThresholdListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly thresholdRepository: IPatientVitalThresholdsRepository,
        private readonly thresholdsDtoService: ThresholdsDtoService,
    ) {}

    public async getList(): Promise<PatientVitalThresholdsDto> {
        const user = await this.authedUserService.getUser();

        const thresholds = await this.thresholdRepository.getCurrentThresholdsByPatientUserId(user.id);

        return await this.thresholdsDtoService.createDtoByThresholds(thresholds);
    }
}
