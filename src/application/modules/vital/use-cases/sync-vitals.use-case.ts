import {SyncVitalsDto, VitalDto} from 'domain/dtos/request/vital';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {User} from 'domain/entities';
import {IVitalEntityMapper} from 'app/modules/vital/mappers/vital-entity.mapper';

export class SyncVitalsUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly vitalRepository: IVitalRepository,
        private readonly vitalEntityMapper: IVitalEntityMapper,
    ) {}

    public async updateVitals(model: SyncVitalsDto): Promise<void> {
        const user = await this.authedUserService.getUser();

        const vitalDtos = await this.filterSavedVitals(model.vitals, user);

        const vitals = vitalDtos.map((vitalDto) => {
            return this.vitalEntityMapper.mapByVitalsDto(vitalDto, user);
        });

        await this.vitalRepository.insertVitals(vitals);
    }

    private async filterSavedVitals(vitalDtos: VitalDto[], user: User): Promise<VitalDto[]> {
        const savedVitals = await this.vitalRepository.getByUserIdAndTimestamps(
            user.id,
            vitalDtos.map((item) => item.timestamp),
        );

        const timestamps = savedVitals.map((item) => item.timestamp);

        return vitalDtos.filter((item) => !timestamps.includes(item.timestamp));
    }
}
