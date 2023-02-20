import {AbsoluteVitalsDto} from 'domain/dtos/response/vital/absolute-vitals.dto';

export class AbsoluteVitalsUseCase {
    public getList(): AbsoluteVitalsDto {
        return AbsoluteVitalsDto.mapByConstants();
    }
}
