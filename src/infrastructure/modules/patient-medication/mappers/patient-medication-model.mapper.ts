import {PatientMedicationModel} from 'infrastructure/modules/patient-medication/models';
import {IPatientMedicationEntityMapper} from 'app/modules/patient-medication/mappers/patient-medication-entity.mapper';
import {PatientMedication} from 'domain/entities';
import {CreateMedicationDto} from 'domain/dtos/request/patient-medication/create-medication.dto';
import {TimesPerDayEnum} from 'domain/constants/medication.const';
import {UpdateMedicationDto} from 'domain/dtos/request/patient-medication/update-medication.dto';

export class PatientMedicationModelMapper implements IPatientMedicationEntityMapper {
    public mapByCreateMedicationDto(createMedicationDto: CreateMedicationDto): PatientMedication {
        const patientMedication = new PatientMedicationModel();
        patientMedication.patientUserId = createMedicationDto.patientUserId;
        patientMedication.genericName = createMedicationDto.genericName;
        patientMedication.brandNames = createMedicationDto.brandNames;
        patientMedication.dose = createMedicationDto.dose;
        patientMedication.timesPerDay = createMedicationDto.timesPerDay as TimesPerDayEnum;

        return patientMedication;
    }
    mapByUpdateMedicationDto(
        updateMedicationDto: UpdateMedicationDto,
        patientMedication: PatientMedication,
    ): PatientMedication {
        patientMedication.genericName = updateMedicationDto.genericName;
        patientMedication.brandNames = updateMedicationDto.brandNames;
        patientMedication.dose = updateMedicationDto.dose;
        patientMedication.timesPerDay = updateMedicationDto.timesPerDay as TimesPerDayEnum;

        return patientMedication;
    }
}
