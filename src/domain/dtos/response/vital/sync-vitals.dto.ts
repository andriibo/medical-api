import {Vital} from 'domain/entities';
import {VitalDto} from './vital.dto';

export class SyncVitalsDto {
    public vitals: VitalDto[];

    public static fromVitalsList(vital: Vital[]): SyncVitalsDto {
        const dto = new SyncVitalsDto();
        dto.vitals = vital.map((vital) => VitalDto.fromVital(vital));

        return dto;
    }
}
