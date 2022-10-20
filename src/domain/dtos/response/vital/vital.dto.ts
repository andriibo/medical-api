import {Vital} from 'domain/entities';

export class VitalDto {
    public vitalId: string;

    public timestamp: number;

    public temperature: number;

    public hr: number;

    public spo: number;

    public rr: number;

    public fall: boolean;

    public static fromVital(vital: Vital): VitalDto {
        const dto = new VitalDto();
        dto.vitalId = vital.vitalId;
        dto.timestamp = vital.timestamp;
        dto.temperature = vital.temperature;
        dto.hr = vital.hr;
        dto.spo = vital.spo;
        dto.rr = vital.rr;
        dto.fall = vital.fall;

        return dto;
    }
}
