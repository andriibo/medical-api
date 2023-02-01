import {VitalDto} from 'domain/dtos/request/vital';
import {User, Vital} from 'domain/entities';

export interface IVitalEntityMapper {
    mapByVitalsDto(dto: VitalDto, patient: User): Vital;
}

export const IVitalEntityMapper = Symbol('IVitalEntityMapper');
