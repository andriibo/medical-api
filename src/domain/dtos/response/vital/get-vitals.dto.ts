import {Vital} from 'domain/entities';
import {VitalDto} from './vital.dto';

export class GetVitalsDto {
    public vitals: VitalDto[];

    public static fromVitalsList(vital: Vital[]): GetVitalsDto {
        const dto = new GetVitalsDto();
        dto.vitals = vital.map((vital) => VitalDto.fromVital(vital));

        return dto;
    }
}
