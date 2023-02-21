import {ThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/thresholds.dto';
import {PatientVitalThresholds} from 'domain/entities';
import {IUserRepository} from 'app/modules/auth/repositories';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class ThresholdsDtoService {
    public constructor(private readonly userRepository: IUserRepository) {}

    public async createDtoByThresholds(thresholdsGroup: PatientVitalThresholds[]): Promise<ThresholdsDto> {
        const thresholdsDto = new ThresholdsDto();
        thresholdsDto.thresholds = this.createDtosByThresholdsGroup(thresholdsGroup);
        thresholdsDto.users = await this.getUserDtosWhoSetThresholds(thresholdsGroup);

        return thresholdsDto;
    }

    private createDtosByThresholdsGroup(thresholdsGroup: PatientVitalThresholds[]): PatientVitalThresholdsDto[] {
        return thresholdsGroup.map((thresholds) => {
            return PatientVitalThresholdsDto.fromPatientVitalThresholds(thresholds);
        });
    }

    private async getUserDtosWhoSetThresholds(thresholdsGroup: PatientVitalThresholds[]): Promise<UserDto[]> {
        const userIds = this.extractUserIds(thresholdsGroup);
        const users = await this.userRepository.getByIds(userIds);
        const userDtos = users.map((user) => UserDto.fromUser(user));

        return userDtos;
    }

    private extractUserIds(thresholdsGroup: PatientVitalThresholds[]): string[] {
        let userIds: string[] = [];
        thresholdsGroup.map((thresholds) => {
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
        });

        return userIds;
    }
}
