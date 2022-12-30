import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {PatientVitalThresholds, User} from 'domain/entities';
import {PatientVitalThresholdsModel} from 'infrastructure/modules/patient-vital-thresholds/models';
import {BloodPressureThresholdsDto} from 'domain/dtos/request/patient-vital-threshold/blood-pressure-thresholds.dto';
import {currentUnixTimestamp} from 'app/support/date.helper';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-max-threshold.dto';
import {MinThresholdDto} from 'domain/dtos/request/patient-vital-threshold/min-threshold.dto';
import {
    MaxDBP,
    MaxHR,
    MaxMAP,
    MaxRR,
    MaxSBP,
    MaxTemp,
    MinDBP,
    MinHR,
    MinMAP,
    MinRR,
    MinSBP,
    MinSpO2,
    MinTemp,
} from 'app/modules/patient-vital-thresholds/templates/default-thresholds.template';

export class PatientVitalThresholdsEntityMapper implements IPatientVitalThresholdsEntityMapper {
    mapByBloodPressureDto(
        dto: BloodPressureThresholdsDto,
        patientVitalThresholds: PatientVitalThresholds | null,
        doctor: User,
    ): PatientVitalThresholds {
        if (patientVitalThresholds === null) {
            patientVitalThresholds = this.createThresholdsModelWithDefaultValues();
        } else {
            patientVitalThresholds.id = null;
        }
        patientVitalThresholds.minDbp = dto.minDBP;
        patientVitalThresholds.maxDbp = dto.maxDBP;
        patientVitalThresholds.minSbp = dto.minSBP;
        patientVitalThresholds.maxSbp = dto.maxSBP;
        patientVitalThresholds.dbpSetBy = doctor.id;
        patientVitalThresholds.dbpSetAt = currentUnixTimestamp();
        patientVitalThresholds.sbpSetBy = doctor.id;
        patientVitalThresholds.sbpSetAt = currentUnixTimestamp();

        return patientVitalThresholds;
    }

    mapByMinMaxHeartRateDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds | null,
        doctor: User,
    ): PatientVitalThresholds {
        if (patientVitalThresholds === null) {
            patientVitalThresholds = this.createThresholdsModelWithDefaultValues();
        } else {
            patientVitalThresholds.id = null;
        }
        patientVitalThresholds.minHr = dto.min;
        patientVitalThresholds.maxHr = dto.max;
        patientVitalThresholds.hrSetAt = currentUnixTimestamp();
        patientVitalThresholds.hrSetBy = doctor.id;

        return patientVitalThresholds;
    }

    mapByMinMaxMeanArterialPressureDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds | null,
        doctor: User,
    ): PatientVitalThresholds {
        if (patientVitalThresholds === null) {
            patientVitalThresholds = this.createThresholdsModelWithDefaultValues();
        } else {
            patientVitalThresholds.id = null;
        }
        patientVitalThresholds.minMap = dto.min;
        patientVitalThresholds.maxMap = dto.max;
        patientVitalThresholds.mapSetAt = currentUnixTimestamp();
        patientVitalThresholds.mapSetBy = doctor.id;

        return patientVitalThresholds;
    }

    mapByMinOxygenSaturationDto(
        dto: MinThresholdDto,
        patientVitalThresholds: PatientVitalThresholds | null,
        doctor: User,
    ): PatientVitalThresholds {
        if (patientVitalThresholds === null) {
            patientVitalThresholds = this.createThresholdsModelWithDefaultValues();
        } else {
            patientVitalThresholds.id = null;
        }
        patientVitalThresholds.minSpo2 = dto.min;
        patientVitalThresholds.spo2SetAt = currentUnixTimestamp();
        patientVitalThresholds.spo2SetBy = doctor.id;

        return patientVitalThresholds;
    }

    mapByMinMaxRespirationRateDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds | null,
        doctor: User,
    ): PatientVitalThresholds {
        if (patientVitalThresholds === null) {
            patientVitalThresholds = this.createThresholdsModelWithDefaultValues();
        } else {
            patientVitalThresholds.id = null;
        }
        patientVitalThresholds.minRr = dto.min;
        patientVitalThresholds.maxRr = dto.min;
        patientVitalThresholds.rrSetAt = currentUnixTimestamp();
        patientVitalThresholds.rrSetBy = doctor.id;

        return patientVitalThresholds;
    }

    mapByMinMaxTemperatureDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds | null,
        doctor: User,
    ): PatientVitalThresholds {
        if (patientVitalThresholds === null) {
            patientVitalThresholds = this.createThresholdsModelWithDefaultValues();
        } else {
            patientVitalThresholds.id = null;
        }
        patientVitalThresholds.id = null;
        patientVitalThresholds.minTemp = dto.min;
        patientVitalThresholds.maxTemp = dto.min;
        patientVitalThresholds.tempSetAt = currentUnixTimestamp();
        patientVitalThresholds.tempSetBy = doctor.id;

        return patientVitalThresholds;
    }

    private createThresholdsModelWithDefaultValues(): PatientVitalThresholdsModel {
        const patientVitalThresholds = new PatientVitalThresholdsModel();
        patientVitalThresholds.minHr = MinHR.value;
        patientVitalThresholds.maxHr = MaxHR.value;
        patientVitalThresholds.minTemp = MinTemp.value;
        patientVitalThresholds.maxTemp = MaxTemp.value;
        patientVitalThresholds.minSpo2 = MinSpO2.value;
        patientVitalThresholds.minRr = MinRR.value;
        patientVitalThresholds.maxRr = MaxRR.value;
        patientVitalThresholds.minDbp = MinDBP.value;
        patientVitalThresholds.maxDbp = MaxDBP.value;
        patientVitalThresholds.minSbp = MinSBP.value;
        patientVitalThresholds.maxSbp = MaxSBP.value;
        patientVitalThresholds.minMap = MinMAP.value;
        patientVitalThresholds.maxMap = MaxMAP.value;

        return patientVitalThresholds;
    }
}
