import {PatientMedicationModel} from 'infrastructure/modules/patient-medication/models';
import {IPatientMedicationEntityMapper} from 'app/modules/patient-medication/mappers/patient-medication-entity.mapper';
import {PatientMedication} from 'domain/entities';
import {MedicationDto} from 'domain/dtos/request/patient-medication/medication.dto';
import {TimesPerDayEnum} from 'domain/constants/medication.const';

export class PatientMedicationModelMapper implements IPatientMedicationEntityMapper {
    public mapByMedicationDto(medicationDto: MedicationDto): PatientMedication {
        const patientMedication = new PatientMedicationModel();
        patientMedication.patientUserId = medicationDto.patientUserId;
        patientMedication.genericName = medicationDto.genericName;
        patientMedication.brandNames = medicationDto.brandNames;
        patientMedication.dose = medicationDto.dose;
        patientMedication.timesPerDay = medicationDto.timesPerDay as TimesPerDayEnum;

        return patientMedication;
    }
}
