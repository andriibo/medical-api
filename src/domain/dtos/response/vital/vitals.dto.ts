import {VitalDto} from './vital.dto';
import {Vital} from 'domain/entities';

export class VitalsDto {
    public vitals: VitalDto[];

    public static fromVitalsList(vital: Vital[]): VitalsDto {
        const dto = new VitalsDto();
        dto.vitals = vital.map((vital) => VitalDto.fromVital(vital));

        return dto;
    }
}
