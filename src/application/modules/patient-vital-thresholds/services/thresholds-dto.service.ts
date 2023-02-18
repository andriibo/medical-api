import {ThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/thresholds.dto';
import {PatientVitalThresholds} from 'domain/entities';

export interface IThresholdsDtoService {
    createDtoByThresholds(thresholdsGroup: PatientVitalThresholds[]): Promise<ThresholdsDto>;
}

export const IThresholdsDtoService = Symbol('IThresholdsDtoService');
