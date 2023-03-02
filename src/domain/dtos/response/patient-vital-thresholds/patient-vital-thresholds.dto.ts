import {PatientVitalThresholds} from 'domain/entities';
import {convertToUnixTimestamp} from 'app/support/date.helper';

export class PatientVitalThresholdsDto {
    public thresholdsId: string;

    public minHr: number;

    public maxHr: number;

    public hrSetBy: string | null;

    public hrSetAt: number | null;

    public minTemp: string;

    public maxTemp: string;

    public tempSetBy: string | null;

    public tempSetAt: number | null;

    public minSpo2: number;

    public spo2SetBy: string | null;

    public spo2SetAt: number | null;

    public minRr: number;

    public maxRr: number;

    public rrSetBy: string | null;

    public rrSetAt: number | null;

    public minDbp: number;

    public maxDbp: number;

    public dbpSetBy: string | null;

    public dbpSetAt: number | null;

    public minSbp: number;

    public maxSbp: number;

    public sbpSetBy: string | null;

    public sbpSetAt: number | null;

    public minMap: number;

    public maxMap: number;

    public mapSetBy: string | null;

    public mapSetAt: number | null;

    public createdAt: number;

    public isPending = false;

    public static fromPatientVitalThresholds(thresholds: PatientVitalThresholds): PatientVitalThresholdsDto {
        const dto = new PatientVitalThresholdsDto();
        dto.thresholdsId = thresholds.id;
        dto.minHr = thresholds.minHr;
        dto.maxHr = thresholds.maxHr;
        dto.hrSetBy = thresholds.hrSetBy;
        dto.hrSetAt = thresholds.hrSetAt;
        dto.minTemp = thresholds.minTemp;
        dto.maxTemp = thresholds.maxTemp;
        dto.tempSetBy = thresholds.tempSetBy;
        dto.tempSetAt = thresholds.tempSetAt;
        dto.minSpo2 = thresholds.minSpo2;
        dto.spo2SetBy = thresholds.spo2SetBy;
        dto.spo2SetAt = thresholds.spo2SetAt;
        dto.minRr = thresholds.minRr;
        dto.maxRr = thresholds.maxRr;
        dto.rrSetBy = thresholds.rrSetBy;
        dto.rrSetAt = thresholds.rrSetAt;
        dto.minDbp = thresholds.minDbp;
        dto.maxDbp = thresholds.maxDbp;
        dto.dbpSetBy = thresholds.dbpSetBy;
        dto.dbpSetAt = thresholds.dbpSetAt;
        dto.minSbp = thresholds.minSbp;
        dto.maxSbp = thresholds.maxSbp;
        dto.sbpSetBy = thresholds.sbpSetBy;
        dto.sbpSetAt = thresholds.sbpSetAt;
        dto.minMap = thresholds.minMap;
        dto.maxMap = thresholds.maxMap;
        dto.mapSetBy = thresholds.mapSetBy;
        dto.mapSetAt = thresholds.mapSetAt;
        dto.createdAt = convertToUnixTimestamp(thresholds.createdAt);

        return dto;
    }
}
