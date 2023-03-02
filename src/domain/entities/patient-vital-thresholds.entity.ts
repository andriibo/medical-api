export interface PatientVitalThresholds {
    id: string;

    patientUserId: string;

    minHr: number;

    maxHr: number;

    hrSetBy: string | null;

    hrSetAt: number | null;

    minTemp: string;

    maxTemp: string;

    tempSetBy: string | null;

    tempSetAt: number | null;

    minSpo2: number;

    spo2SetBy: string | null;

    spo2SetAt: number | null;

    minRr: number;

    maxRr: number;

    rrSetBy: string | null;

    rrSetAt: number | null;

    minDbp: number;

    maxDbp: number;

    dbpSetBy: string | null;

    dbpSetAt: number | null;

    minSbp: number;

    maxSbp: number;

    sbpSetBy: string | null;

    sbpSetAt: number | null;

    minMap: number;

    maxMap: number;

    mapSetBy: string | null;

    mapSetAt: number | null;

    createdAt: string;
}
