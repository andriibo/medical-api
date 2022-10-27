import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

export class PatientVitalThresholdSpecification {
    public constructor(private readonly patientDataAccessSpecification: PatientDataAccessSpecification) {}
}
