import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {PatientVitalThresholds, User} from 'domain/entities';
import {PatientVitalThresholdsModel} from 'infrastructure/modules/patient-vital-thresholds/models';
import {BloodPressureThresholdsDto} from 'domain/dtos/request/patient-vital-thresholds/blood-pressure-thresholds.dto';
import {currentUnixTimestamp} from 'support/date.helper';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-max-threshold.dto';
import {MinThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-threshold.dto';

export class PatientVitalThresholdsModelMapper implements IPatientVitalThresholdsEntityMapper {
    public mapByBloodPressureDto(
        dto: BloodPressureThresholdsDto,
        patientVitalThresholds: PatientVitalThresholds,
        doctor: User,
    ): PatientVitalThresholds {
        patientVitalThresholds = this.mapByEntity(patientVitalThresholds);
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

    public mapByMinMaxHeartRateDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds,
        doctor: User,
    ): PatientVitalThresholds {
        patientVitalThresholds = this.mapByEntity(patientVitalThresholds);
        patientVitalThresholds.minHr = dto.min;
        patientVitalThresholds.maxHr = dto.max;
        patientVitalThresholds.hrSetAt = currentUnixTimestamp();
        patientVitalThresholds.hrSetBy = doctor.id;

        return patientVitalThresholds;
    }

    public mapByMinMaxMeanArterialPressureDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds,
        doctor: User,
    ): PatientVitalThresholds {
        patientVitalThresholds = this.mapByEntity(patientVitalThresholds);
        patientVitalThresholds.minMap = dto.min;
        patientVitalThresholds.maxMap = dto.max;
        patientVitalThresholds.mapSetAt = currentUnixTimestamp();
        patientVitalThresholds.mapSetBy = doctor.id;

        return patientVitalThresholds;
    }

    public mapByMinOxygenSaturationDto(
        dto: MinThresholdDto,
        patientVitalThresholds: PatientVitalThresholds,
        doctor: User,
    ): PatientVitalThresholds {
        patientVitalThresholds = this.mapByEntity(patientVitalThresholds);
        patientVitalThresholds.minSpo2 = dto.min;
        patientVitalThresholds.spo2SetAt = currentUnixTimestamp();
        patientVitalThresholds.spo2SetBy = doctor.id;

        return patientVitalThresholds;
    }

    public mapByMinMaxRespirationRateDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds,
        doctor: User,
    ): PatientVitalThresholds {
        patientVitalThresholds = this.mapByEntity(patientVitalThresholds);
        patientVitalThresholds.minRr = dto.min;
        patientVitalThresholds.maxRr = dto.max;
        patientVitalThresholds.rrSetAt = currentUnixTimestamp();
        patientVitalThresholds.rrSetBy = doctor.id;

        return patientVitalThresholds;
    }

    public mapByMinMaxTemperatureDto(
        dto: MinMaxThresholdDto,
        patientVitalThresholds: PatientVitalThresholds,
        doctor: User,
    ): PatientVitalThresholds {
        patientVitalThresholds = this.mapByEntity(patientVitalThresholds);
        patientVitalThresholds.minTemp = dto.min;
        patientVitalThresholds.maxTemp = dto.max;
        patientVitalThresholds.tempSetAt = currentUnixTimestamp();
        patientVitalThresholds.tempSetBy = doctor.id;

        return patientVitalThresholds;
    }

    public mapDefaultByPatient(patient: User): PatientVitalThresholds {
        const patientVitalThresholds = PatientVitalThresholdsModel.getModelWithDefaultValues();
        patientVitalThresholds.patientUserId = patient.id;

        return patientVitalThresholds;
    }

    private mapByEntity(entity: PatientVitalThresholds): PatientVitalThresholds {
        const model = new PatientVitalThresholdsModel();
        model.minHr = entity.minHr;
        model.maxHr = entity.maxHr;
        model.hrSetBy = entity.hrSetBy;
        model.hrSetAt = entity.hrSetAt;
        model.minTemp = entity.minTemp;
        model.maxTemp = entity.maxTemp;
        model.tempSetBy = entity.tempSetBy;
        model.tempSetAt = entity.tempSetAt;
        model.minSpo2 = entity.minSpo2;
        model.spo2SetBy = entity.spo2SetBy;
        model.spo2SetAt = entity.spo2SetAt;
        model.minRr = entity.minRr;
        model.maxRr = entity.maxRr;
        model.rrSetBy = entity.rrSetBy;
        model.rrSetAt = entity.rrSetAt;
        model.minDbp = entity.minDbp;
        model.maxDbp = entity.maxDbp;
        model.dbpSetBy = entity.dbpSetBy;
        model.dbpSetAt = entity.dbpSetAt;
        model.minSbp = entity.minSbp;
        model.maxSbp = entity.maxSbp;
        model.sbpSetBy = entity.sbpSetBy;
        model.sbpSetAt = entity.sbpSetAt;
        model.minMap = entity.minMap;
        model.maxMap = entity.maxMap;
        model.mapSetBy = entity.mapSetBy;
        model.mapSetAt = entity.mapSetAt;

        return model;
    }
}
