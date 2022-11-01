import {PatientVitalThreshold} from 'domain/entities/patient-vital-threshold.entity';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class ThresholdDto {
    public thresholdName: string;

    public value: number;

    public setAtTimestamp?: number;

    public setByUser?: UserDto;

    public static fromPatientVitalThreshold(threshold: PatientVitalThreshold): ThresholdDto {
        const dto = new ThresholdDto();
        dto.thresholdName = threshold.thresholdName;
        dto.value = threshold.value;
        dto.setAtTimestamp = threshold.setAt;

        return dto;
    }
}
