export class VitalDto {
    public temp: string | null;

    public isTempNormal: boolean | null;

    public hr: number | null;

    public isHrNormal: boolean | null;

    public spo2: number | null;

    public isSpo2Normal: boolean | null;

    public rr: number | null;

    public isRrNormal: boolean | null;

    public fall: boolean | null;

    public timestamp: number;

    public thresholdsId: string;
}
