import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {GetVitalsUseCase, SyncVitalsUseCase} from 'app/use-cases/vitals';

@Injectable()
export class VitalUseCasesFactory {
    constructor(@Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService) {}

    public getVitals(/*vitals filters*/): GetVitalsUseCase {
        return new GetVitalsUseCase(this.authedUserService);
    }

    public syncPatientVitals(/* */): SyncVitalsUseCase {
        return new SyncVitalsUseCase(this.authedUserService);
    }
}
