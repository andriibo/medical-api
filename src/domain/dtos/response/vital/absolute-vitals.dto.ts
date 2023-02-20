import {
    AbsMaxDBP,
    AbsMaxHR,
    AbsMaxRR,
    AbsMaxSBP,
    AbsMaxSpO2,
    AbsMaxTemp,
    AbsMinDBP,
    AbsMinHR,
    AbsMinRR,
    AbsMinSBP,
    AbsMinSpO2,
    AbsMinTemp,
} from 'domain/constants/vitals.const';

export class AbsoluteVitalsDto {
    public minHr: number;

    public maxHr: number;

    public minTemp: number;

    public maxTemp: number;

    public minSpo2: number;

    public maxSpo2: number;

    public minRr: number;

    public maxRr: number;

    public minDbp: number;

    public maxDbp: number;

    public minSbp: number;

    public maxSbp: number;

    public static mapByConstants(): AbsoluteVitalsDto {
        const dto = new AbsoluteVitalsDto();
        dto.minHr = AbsMinHR;
        dto.maxHr = AbsMaxHR;
        dto.minTemp = AbsMinTemp;
        dto.maxTemp = AbsMaxTemp;
        dto.minSpo2 = AbsMinSpO2;
        dto.maxSpo2 = AbsMaxSpO2;
        dto.minRr = AbsMinRR;
        dto.maxRr = AbsMaxRR;
        dto.minDbp = AbsMinDBP;
        dto.maxDbp = AbsMaxDBP;
        dto.minSbp = AbsMinSBP;
        dto.maxSbp = AbsMaxSBP;

        return dto;
    }
}
