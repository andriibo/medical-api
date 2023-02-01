import {IVitalEntityMapper} from 'app/modules/vital/mappers/vital-entity.mapper';
import {User, Vital} from 'domain/entities';
import {VitalDto} from 'domain/dtos/request/vital';
import {VitalModel} from 'infrastructure/modules/vital/models';

export class VitalModelMapper implements IVitalEntityMapper {
    public mapByVitalsDto(dto: VitalDto, patient: User): Vital {
        const vital = new VitalModel();
        vital.fall = dto.fall;
        vital.hr = dto.hr;
        vital.isHrNormal = dto.isHrNormal;
        vital.rr = dto.rr;
        vital.isRrNormal = dto.isRrNormal;
        vital.spo2 = dto.spo2;
        vital.isSpo2Normal = dto.isSpo2Normal;
        vital.temp = dto.temp;
        vital.isTempNormal = dto.isTempNormal;
        vital.timestamp = dto.timestamp;
        vital.thresholdsId = dto.thresholdsId;
        vital.userId = patient.id;

        return vital;
    }
}
