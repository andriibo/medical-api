import {SyncVitalDto} from 'domain/dtos/vital/sync-vital.dto';
import {IAuthedUserService} from 'app/services/authed-user.service';

export class SyncVitalsUseCase {
    constructor(private readonly authedUserService: IAuthedUserService) {}

    public async getVitals(vitals: SyncVitalDto[]): Promise<void> {

    }
}
