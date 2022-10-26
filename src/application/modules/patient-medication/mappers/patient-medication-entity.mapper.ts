import {PatientMedication} from 'domain/entities';
import {MedicationDto} from 'domain/dtos/request/patient-medication/medication.dto';

export interface IPatientMedicationEntityMapper {
    mapByMedicationDto(medicationDto: MedicationDto): PatientMedication;
}

export const IPatientMedicationEntityMapper = Symbol('IPatientMedicationEntityMapper');
