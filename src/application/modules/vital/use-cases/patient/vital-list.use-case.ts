import {IVitalRepository} from 'app/modules/vital/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {GetVitalsByPatientDto} from 'domain/dtos/request/vital';
import {VitalsDto} from 'domain/dtos/response/vital/';
import {VitalsDtoService} from 'app/modules/vital/services/vitals-dto.service';

export class VitalListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly vitalRepository: IVitalRepository,
        private readonly vitalsDtoService: VitalsDtoService,
    ) {}

    public async getList(dto: GetVitalsByPatientDto): Promise<VitalsDto> {
        const user = await this.authedUserService.getUser();
        const vitals = await this.vitalRepository.getByUserIdForInterval(user.id, dto.startDate, dto.endDate);

        return this.vitalsDtoService.createDtoByVitals(vitals);
    }
}
