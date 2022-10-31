import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientVitalThreshold, User} from 'domain/entities';
import {IUserRepository} from 'app/modules/auth/repositories';
import {arrayUnique} from 'app/support/array.helper';
import {UserDto} from 'domain/dtos/response/user/user.dto';
import {ThresholdDto} from 'domain/dtos/response/patient-vital-threshold/threshold.dto';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdSpecification} from 'app/modules/patient-vital-threshold/specifications/patient-vital-threshold.specification';

export class ThresholdListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly userRepository: IUserRepository,
        private readonly thresholdRepository: IPatientVitalThresholdRepository,
        private readonly thresholdSpecification: PatientVitalThresholdSpecification,
    ) {}

    public async getList(patientUserId: string): Promise<ThresholdDto[]> {
        const user = await this.authedUserService.getUser();

        await this.thresholdSpecification.assertGrantedUserCanOperateThreshold(user, patientUserId);

        const items = await this.thresholdRepository.getByPatientUserId(patientUserId);

        const users = await this.getUsersWhoSetThreshold(items);

        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.id] = user));

        return items.map((item) => {
            const dto = ThresholdDto.fromPatientVitalThreshold(item);
            dto.setByUser = UserDto.fromUser(indexedUsers[item.setBy]);

            return dto;
        });
    }

    private async getUsersWhoSetThreshold(items: PatientVitalThreshold[]): Promise<User[]> {
        const userIds = items.map((item) => item.setBy);

        return await this.userRepository.getByIds(arrayUnique(userIds));
    }
}
