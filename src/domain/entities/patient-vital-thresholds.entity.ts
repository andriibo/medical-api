export interface PatientVitalThresholds {
    id: number;

    patientUserId: string;

    minHr: number;

    maxHr: number;

    hrSetBy?: string;

    hrSetAt?: number;

    minTemp: number;

    maxTemp: number;

    tempSetBy?: string;

    tempSetAt?: number;

    minSpo2: number;

    spo2SetBy?: string;

    spo2SetAt?: number;

    minRr: number;

    maxRr: number;

    rrSetBy?: string;

    rrSetAt?: number;

    minDbp: number;

    maxDbp: number;

    dbpSetBy?: string;

    dbpSetAt?: number;

    minSbp: number;

    maxSbp: number;

    sbpSetBy?: string;

    sbpSetAt?: number;

    minMap: number;

    maxMap: number;

    mapSetBy?: string;

    mapSetAt?: number;
}
