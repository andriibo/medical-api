import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientVitalThresholds, User} from 'domain/entities';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';
import {ThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';
import {IVitalRepository} from 'app/modules/vital/repositories';

export class ThresholdListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly thresholdsRepository: IPatientVitalThresholdsRepository,
        private readonly thresholdSpecification: PatientVitalThresholdsSpecification,
        private readonly vitalRepository: IVitalRepository,
        private readonly thresholdsDtoService: ThresholdsDtoService,
    ) {}

    public async getList(patientUserId: string): Promise<PatientVitalThresholdsDto> {
        const user = await this.authedUserService.getUser();

        await this.thresholdSpecification.assertGrantedUserCanOperateThresholds(user, patientUserId);

        const thresholds = await this.thresholdsRepository.getCurrentThresholdsByPatientUserId(patientUserId);
        const vitalsCount = this.vitalRepository.getCountByThresholdsId(thresholds.id);

        const dto = await this.thresholdsDtoService.createDtoByThresholds(thresholds);
        dto.isPending = !vitalsCount;

        return dto;
    }

    private async getUsersWhoSetThreshold(thresholds: PatientVitalThresholds): Promise<User[]> {
        const userIds = [
            thresholds.hrSetBy,
            thresholds.tempSetBy,
            thresholds.spo2SetBy,
            thresholds.rrSetBy,
            thresholds.dbpSetBy,
            thresholds.sbpSetBy,
            thresholds.mapSetBy,
        ].filter((setBy) => setBy !== null);

        return await this.userRepository.getByIds(userIds);
    }
}
