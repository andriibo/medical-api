import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientVitalThresholds, User} from 'domain/entities';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';
import {ThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';

export class ThresholdListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly thresholdsRepository: IPatientVitalThresholdsRepository,
        private readonly thresholdSpecification: PatientVitalThresholdsSpecification,
        private readonly thresholdsDtoService: ThresholdsDtoService,
    ) {}

    public async getList(patientUserId: string): Promise<PatientVitalThresholdsDto> {
        const user = await this.authedUserService.getUser();

        await this.thresholdSpecification.assertGrantedUserCanOperateThresholds(user, patientUserId);

        const thresholds = await this.thresholdsRepository.getCurrentThresholdsByPatientUserId(patientUserId);

        return await this.thresholdsDtoService.createDtoByThresholds(thresholds);
    }
}
