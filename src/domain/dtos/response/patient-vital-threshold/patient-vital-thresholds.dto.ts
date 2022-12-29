import {UserDto} from 'domain/dtos/response/user/user.dto';
import {PatientVitalThresholds, User} from 'domain/entities';
import {
    MaxDBP,
    MaxHR,
    MaxMAP,
    MaxRR,
    MaxSBP,
    MaxTemp,
    MinDBP,
    MinHR,
    MinMAP,
    MinRR,
    MinSBP,
    MinSpO2,
    MinTemp,
} from 'app/modules/patient-vital-thresholds/templates/default-thresholds.template';

export class PatientVitalThresholdsDto {
    public minHr: number;

    public maxHr: number;

    public hrSetBy: UserDto | null;

    public hrSetAt: number | null;

    public minTemp: number;

    public maxTemp: number;

    public tempSetBy: UserDto | null;

    public tempSetAt: number | null;

    public minSpo2: number;

    public spo2SetBy: UserDto | null;

    public spo2SetAt: number | null;

    public minRr: number;

    public maxRr: number;

    public rrSetBy: UserDto | null;

    public rrSetAt: number | null;

    public minDbp: number;

    public maxDbp: number;

    public dbpSetBy: UserDto | null;

    public dbpSetAt: number | null;

    public minSbp: number;

    public maxSbp: number;

    public sbpSetBy: UserDto | null;

    public sbpSetAt: number | null;

    public minMap: number;

    public maxMap: number;

    public mapSetBy: UserDto | null;

    public mapSetAt: number | null;

    public static fromPatientVitalThresholds(
        thresholds: PatientVitalThresholds,
        users: User[],
    ): PatientVitalThresholdsDto {
        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.id] = user));

        const dto = new PatientVitalThresholdsDto();
        dto.minHr = thresholds.minHr;
        dto.maxHr = thresholds.maxHr;
        dto.hrSetBy = UserDto.fromUser(indexedUsers[thresholds.hrSetBy]);
        dto.hrSetAt = thresholds.hrSetAt;
        dto.minTemp = thresholds.minTemp;
        dto.maxTemp = thresholds.maxTemp;
        dto.tempSetBy = UserDto.fromUser(indexedUsers[thresholds.tempSetBy]);
        dto.tempSetAt = thresholds.tempSetAt;
        dto.minSpo2 = thresholds.minSpo2;
        dto.spo2SetBy = UserDto.fromUser(indexedUsers[thresholds.spo2SetBy]);
        dto.spo2SetAt = thresholds.spo2SetAt;
        dto.minRr = thresholds.minRr;
        dto.maxRr = thresholds.maxRr;
        dto.rrSetBy = UserDto.fromUser(indexedUsers[thresholds.rrSetBy]);
        dto.rrSetAt = thresholds.rrSetAt;
        dto.minDbp = thresholds.minDbp;
        dto.maxDbp = thresholds.maxDbp;
        dto.dbpSetBy = UserDto.fromUser(indexedUsers[thresholds.dbpSetBy]);
        dto.dbpSetAt = thresholds.dbpSetAt;
        dto.minSbp = thresholds.minSbp;
        dto.maxSbp = thresholds.maxSbp;
        dto.sbpSetBy = UserDto.fromUser(indexedUsers[thresholds.sbpSetBy]);
        dto.sbpSetAt = thresholds.sbpSetAt;
        dto.minMap = thresholds.minMap;
        dto.maxMap = thresholds.maxMap;
        dto.mapSetBy = UserDto.fromUser(indexedUsers[thresholds.mapSetBy]);
        dto.mapSetAt = thresholds.mapSetAt;

        return dto;
    }

    public static getDtoWithDefaultValues(): PatientVitalThresholdsDto {
        const dto = new PatientVitalThresholdsDto();
        dto.minHr = MinHR.value;
        dto.maxHr = MaxHR.value;
        dto.minTemp = MinTemp.value;
        dto.maxTemp = MaxTemp.value;
        dto.minSpo2 = MinSpO2.value;
        dto.minRr = MinRR.value;
        dto.maxRr = MaxRR.value;
        dto.minDbp = MinDBP.value;
        dto.maxDbp = MaxDBP.value;
        dto.minSbp = MinSBP.value;
        dto.maxSbp = MaxSBP.value;
        dto.minMap = MinMAP.value;
        dto.maxMap = MaxMAP.value;

        return dto;
    }
}
