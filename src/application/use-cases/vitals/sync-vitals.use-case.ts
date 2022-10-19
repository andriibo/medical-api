import {SyncVitalDto, VitalDto} from 'domain/dtos/request/vital';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {IVitalRepository} from 'app/repositories';
import {SyncVitalsDto as SyncVitalsDtoResponse} from 'domain/dtos/response/vital';
import {User} from 'domain/entities';

export class SyncVitalsUseCase {
    constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly vitalRepository: IVitalRepository,
    ) {}

    public async updateVitals(model: SyncVitalDto): Promise<SyncVitalsDtoResponse> {
        const user = await this.authedUserService.getUser();
        const vitalsToBeSaved = await this.filterVitalsToBeSaved(model.vitals, user);

        const savedVitals = await this.vitalRepository.createRange(vitalsToBeSaved, user);
        return SyncVitalsDtoResponse.fromVitalsList(savedVitals);
    }

    private async filterVitalsToBeSaved(vitals: VitalDto[], user: User): Promise<VitalDto[]> {
        const alreadySavedVitals = await this.vitalRepository.getAlreadySavedByUser(
            user.userId,
            vitals.map((vital) => vital.timestamp),
        );
        const vitalsToBeSaved = vitals.filter(
            (vital) => !alreadySavedVitals.map((savedVital) => savedVital.timestamp).includes(vital.timestamp)
        );

        return vitalsToBeSaved;
    }
}
