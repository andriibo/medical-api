import {Injectable} from '@nestjs/common';
import {GetVitalsUseCase, SyncVitalsUseCase} from 'app/use-cases/vitals';

@Injectable()
export class VitalUseCasesFactory {
    constructor() {}

    public getVitals(/*vitals filters*/): GetVitalsUseCase {
        return new GetVitalsUseCase();
    }

    public syncPatientVitals(/* */): SyncVitalsUseCase {
        return new SyncVitalsUseCase();
    }
}
