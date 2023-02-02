import {PatientVitalThresholds, User} from 'domain/entities';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';
import {IUserRepository} from 'app/modules/auth/repositories';

export class ThresholdsDtoService {
    public constructor(private readonly userRepository: IUserRepository) {}

    public async createDtoByThresholds(thresholds: PatientVitalThresholds): Promise<PatientVitalThresholdsDto> {
        const dtos = await this.createDtosByThresholdsGroup([thresholds]);

        return dtos[0];
    }

    public async createDtosByThresholdsGroup(
        thresholdsGroup: PatientVitalThresholds[],
    ): Promise<PatientVitalThresholdsDto[]> {
        const users = await this.getUsersWhoSetThresholds(thresholdsGroup);

        return thresholdsGroup.map((thresholds) => {
            return PatientVitalThresholdsDto.fromPatientVitalThresholds(thresholds, users);
        });
    }

    private async getUsersWhoSetThresholds(thresholdsGroup: PatientVitalThresholds[]): Promise<User[]> {
        const userIds = this.extractUserIds(thresholdsGroup);

        return await this.userRepository.getByIds(userIds);
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
