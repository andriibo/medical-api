import {PatientVitalThreshold, User} from 'domain/entities';
import {ThresholdDto} from 'domain/dtos/response/patient-vital-threshold/threshold.dto';
import {DefaultThresholdsTemplate} from 'app/modules/patient-vital-threshold/temlates/default-thresholds.template';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class PatientVitalThresholdsDtoMapper {
    public map(thresholds: PatientVitalThreshold[], users: User[]): ThresholdDto[] {
        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.id] = user));

        const indexedDtos = {};
        thresholds.map((threshold) => {
            const dto = ThresholdDto.fromPatientVitalThreshold(threshold);
            dto.setByUser = UserDto.fromUser(indexedUsers[threshold.setBy]);

            indexedDtos[dto.thresholdName] = dto;
        });

        return DefaultThresholdsTemplate.map((template) => {
            return template.thresholdName in indexedDtos ? indexedDtos[template.thresholdName] : template;
        });
    }
}
