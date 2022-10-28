import {IPatientVitalThresholdMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-threshold-entity.mapper';
import {PatientVitalThreshold} from 'domain/entities';
import {PatientVitalThresholdModel} from 'infrastructure/models';

export class PatientVitalThresholdMapper implements IPatientVitalThresholdMapper {
    mapByValue(value: number, patientVitalThreshold: PatientVitalThreshold | null): PatientVitalThreshold {
        if (patientVitalThreshold === null) {
            patientVitalThreshold = new PatientVitalThresholdModel();
        }

        patientVitalThreshold.value = value;

        return patientVitalThreshold;
    }
}
