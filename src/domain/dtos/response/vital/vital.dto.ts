import {Vital} from 'domain/entities';

export class VitalDto {
    public vitalId: string;

    public timestamp: number;

    public temp: string | null;

    public isTempNormal: boolean | null;

    public hr: number | null;

    public isHrNormal: boolean | null;

    public spo2: number | null;

    public isSpo2Normal: boolean | null;

    public rr: number | null;

    public isRrNormal: boolean | null;

    public fall: boolean | null;

    public thresholdsId: string;

    public static fromVital(vital: Vital): VitalDto {
        const dto = new VitalDto();
        dto.vitalId = vital.id;
        dto.timestamp = vital.timestamp;
        dto.temp = vital.temp;
        dto.isTempNormal = vital.isTempNormal;
        dto.hr = vital.hr;
        dto.isHrNormal = vital.isHrNormal;
        dto.spo2 = vital.spo2;
        dto.isSpo2Normal = vital.isSpo2Normal;
        dto.rr = vital.rr;
        dto.isRrNormal = vital.isRrNormal;
        dto.fall = vital.fall;
        dto.thresholdsId = vital.thresholdsId;

        return dto;
    }
}
