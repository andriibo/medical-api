import {Vital} from 'domain/entities';
import {VitalDto} from './vital.dto';

export class SyncVitalsDto {
    public vitals: VitalDto[];

    static fromVitalsList(vital: Vital[]): SyncVitalsDto {
        const responseModel = new SyncVitalsDto();
        responseModel.vitals = vital.map((vital) => VitalDto.fromVital(vital));

        return responseModel;
    }
}
