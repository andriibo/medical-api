import {PatientMedication} from 'domain/entities';
import {CreateMedicationDto} from 'domain/dtos/request/patient-medication/create-medication.dto';
import {UpdateMedicationDto} from 'domain/dtos/request/patient-medication/update-medication.dto';

export interface IPatientMedicationEntityMapper {
    mapByCreateMedicationDto(createMedicationDto: CreateMedicationDto): PatientMedication;
    mapByUpdateMedicationDto(
        updateMedicationDto: UpdateMedicationDto,
        patientMedication: PatientMedication,
    ): PatientMedication;
}

export const IPatientMedicationEntityMapper = Symbol('IPatientMedicationEntityMapper');
