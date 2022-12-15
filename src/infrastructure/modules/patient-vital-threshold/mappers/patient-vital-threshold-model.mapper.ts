import {IPatientVitalThresholdEntityMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-threshold-entity.mapper';
import {PatientVitalThreshold} from 'domain/entities';
import {PatientVitalThresholdModel} from 'infrastructure/modules/patient-vital-threshold/models';

export class PatientVitalThresholdEntityMapper implements IPatientVitalThresholdEntityMapper {
    mapByValue(value: number, patientVitalThreshold: PatientVitalThreshold | null): PatientVitalThreshold {
        if (patientVitalThreshold === null) {
            patientVitalThreshold = new PatientVitalThresholdModel();
        }

        patientVitalThreshold.value = value;

        return patientVitalThreshold;
    }
}
