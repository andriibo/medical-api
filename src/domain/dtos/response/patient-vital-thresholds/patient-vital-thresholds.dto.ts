import {UserDto} from 'domain/dtos/response/user/user.dto';
import {PatientVitalThresholds, User} from 'domain/entities';
import {convertToUnixTimestamp} from 'app/support/date.helper';

export class PatientVitalThresholdsDto {
    public thresholdsId: string;

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

    public createdAt: number;

    public isPending = false;

    public static fromPatientVitalThresholds(
        thresholds: PatientVitalThresholds,
        users: User[],
    ): PatientVitalThresholdsDto {
        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.id] = user));

        const dto = new PatientVitalThresholdsDto();
        dto.thresholdsId = thresholds.id;
        dto.minHr = thresholds.minHr;
        dto.maxHr = thresholds.maxHr;
        dto.hrSetBy = indexedUsers[thresholds.hrSetBy] ? UserDto.fromUser(indexedUsers[thresholds.hrSetBy]) : null;
        dto.hrSetAt = thresholds.hrSetAt;
        dto.minTemp = thresholds.minTemp;
        dto.maxTemp = thresholds.maxTemp;
        dto.tempSetBy = indexedUsers[thresholds.tempSetBy]
            ? UserDto.fromUser(indexedUsers[thresholds.tempSetBy])
            : null;
        dto.tempSetAt = thresholds.tempSetAt;
        dto.minSpo2 = thresholds.minSpo2;
        dto.spo2SetBy = indexedUsers[thresholds.spo2SetBy]
            ? UserDto.fromUser(indexedUsers[thresholds.spo2SetBy])
            : null;
        dto.spo2SetAt = thresholds.spo2SetAt;
        dto.minRr = thresholds.minRr;
        dto.maxRr = thresholds.maxRr;
        dto.rrSetBy = indexedUsers[thresholds.rrSetBy] ? UserDto.fromUser(indexedUsers[thresholds.rrSetBy]) : null;
        dto.rrSetAt = thresholds.rrSetAt;
        dto.minDbp = thresholds.minDbp;
        dto.maxDbp = thresholds.maxDbp;
        dto.dbpSetBy = indexedUsers[thresholds.dbpSetBy] ? UserDto.fromUser(indexedUsers[thresholds.dbpSetBy]) : null;
        dto.dbpSetAt = thresholds.dbpSetAt;
        dto.minSbp = thresholds.minSbp;
        dto.maxSbp = thresholds.maxSbp;
        dto.sbpSetBy = indexedUsers[thresholds.sbpSetBy] ? UserDto.fromUser(indexedUsers[thresholds.sbpSetBy]) : null;
        dto.sbpSetAt = thresholds.sbpSetAt;
        dto.minMap = thresholds.minMap;
        dto.maxMap = thresholds.maxMap;
        dto.mapSetBy = indexedUsers[thresholds.mapSetBy] ? UserDto.fromUser(indexedUsers[thresholds.mapSetBy]) : null;
        dto.mapSetAt = thresholds.mapSetAt;
        dto.createdAt = convertToUnixTimestamp(thresholds.createdAt);

        return dto;
    }
}
