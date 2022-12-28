import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientVitalThresholds, User} from 'domain/entities';
import {IUserRepository} from 'app/modules/auth/repositories';
import {arrayUnique} from 'app/support/array.helper';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-threshold/patient-vital-thresholds.dto';

export class ThresholdListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly userRepository: IUserRepository,
        private readonly thresholdsRepository: IPatientVitalThresholdsRepository,
        private readonly thresholdSpecification: PatientVitalThresholdsSpecification,
    ) {}

    public async getList(patientUserId: string): Promise<PatientVitalThresholdsDto> {
        const user = await this.authedUserService.getUser();

        await this.thresholdSpecification.assertGrantedUserCanOperateThreshold(user, patientUserId);

        const thresholds = await this.thresholdsRepository.getOneByPatientUserId(patientUserId);
        if (thresholds === null) {
            return PatientVitalThresholdsDto.getDtoWithDefaultValues();
        }
        const users = await this.getUsersWhoSetThreshold(thresholds);

        return PatientVitalThresholdsDto.fromPatientVitalThresholds(thresholds, users);
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
        ];

        return await this.userRepository.getByIds(arrayUnique(userIds));
    }
}
