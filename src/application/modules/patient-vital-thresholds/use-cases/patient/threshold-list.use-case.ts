import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {ThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/thresholds.dto';
import {UserDto} from 'domain/dtos/response/user/user.dto';
import {IUserRepository} from 'app/modules/auth/repositories';

export class ThresholdListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly thresholdRepository: IPatientVitalThresholdsRepository,
        private readonly vitalRepository: IVitalRepository,
        private readonly userRepository: IUserRepository,
    ) {}

    public async getList(): Promise<ThresholdsDto> {
        const user = await this.authedUserService.getUser();

        const thresholds = await this.thresholdRepository.getCurrentThresholdsByPatientUserId(user.id);
        const patientVitalThresholdsDto = PatientVitalThresholdsDto.fromPatientVitalThresholds(thresholds);
        const vitalsQuantity = await this.vitalRepository.countByThresholdsId(thresholds.id);
        patientVitalThresholdsDto.isPending = !vitalsQuantity;

        const thresholdsDto = new ThresholdsDto();
        thresholdsDto.thresholds.push(patientVitalThresholdsDto);
        thresholdsDto.users = await this.getUserDtosWhoSetThresholds(patientVitalThresholdsDto);

        return thresholdsDto;
    }

    private async getUserDtosWhoSetThresholds(thresholds: PatientVitalThresholdsDto): Promise<UserDto[]> {
        const userIds = this.extractUserIds(thresholds);
        const users = await this.userRepository.getByIds(userIds);
        const userDtos = users.map((user) => UserDto.fromUser(user));

        return userDtos;
    }

    private extractUserIds(thresholds: PatientVitalThresholdsDto): string[] {
        let userIds: string[] = [];
        const setBy = [
            thresholds.hrSetBy,
            thresholds.tempSetBy,
            thresholds.spo2SetBy,
            thresholds.rrSetBy,
            thresholds.dbpSetBy,
            thresholds.sbpSetBy,
            thresholds.mapSetBy,
        ];
        const filteredSetBy = setBy.filter((setBy) => setBy !== null);
        userIds = [...userIds, ...filteredSetBy];

        return userIds;
    }
}
