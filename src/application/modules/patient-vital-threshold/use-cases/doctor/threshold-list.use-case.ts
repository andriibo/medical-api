import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientVitalThreshold, User} from 'domain/entities';
import {IUserRepository} from 'app/modules/auth/repositories';
import {arrayUnique} from 'app/support/array.helper';
import {ThresholdDto} from 'domain/dtos/response/patient-vital-threshold/threshold.dto';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdSpecification} from 'app/modules/patient-vital-threshold/specifications/patient-vital-threshold.specification';
import {PatientVitalThresholdsDtoMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-thresholds-dto.mapper';

export class ThresholdListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly userRepository: IUserRepository,
        private readonly thresholdRepository: IPatientVitalThresholdRepository,
        private readonly thresholdSpecification: PatientVitalThresholdSpecification,
        private readonly patientVitalThresholdsDtoMapper: PatientVitalThresholdsDtoMapper,
    ) {}

    public async getList(patientUserId: string): Promise<ThresholdDto[]> {
        const user = await this.authedUserService.getUser();

        await this.thresholdSpecification.assertGrantedUserCanOperateThreshold(user, patientUserId);

        const thresholds = await this.thresholdRepository.getByPatientUserId(patientUserId);
        const users = await this.getUsersWhoSetThreshold(thresholds);

        return this.patientVitalThresholdsDtoMapper.map(thresholds, users);
    }

    private async getUsersWhoSetThreshold(items: PatientVitalThreshold[]): Promise<User[]> {
        const userIds = items.map((item) => item.setBy);

        return await this.userRepository.getByIds(arrayUnique(userIds));
    }
}
