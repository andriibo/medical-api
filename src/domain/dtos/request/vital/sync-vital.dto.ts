export class SyncVitalDto {
    public vitals: VitalDto[];
}

export class VitalDto {
    public temperature: number;

    public hr: number;

    public spo: number;

    public rr: number;

    public fall: boolean;

    public timestamp: number;
}
