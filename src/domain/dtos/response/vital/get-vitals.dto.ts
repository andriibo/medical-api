import {Vital} from 'domain/entities';
import {VitalDto} from './vital.dto';

export class GetVitalsDto {
    public vitals: VitalDto[];

    static fromVitalsList(vital: Vital[]): GetVitalsDto {
        const responseModel = new GetVitalsDto();
        responseModel.vitals = vital.map((vital) => VitalDto.fromVital(vital));

        return responseModel;
    }
}
