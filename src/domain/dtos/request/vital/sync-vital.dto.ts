export class SyncVitalDto {
    public vitals: VitalDto[];
}

export class VitalDto {
    public temperature: number | null;

    public hr: number | null;

    public spo: number | null;

    public rr: number | null;

    public fall: boolean | null;

    public timestamp: number;
}
