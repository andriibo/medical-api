import {AbsoluteVitalsUseCase} from 'app/modules/vital/use-cases/absolute-vitals.use-case';

export class VitalUseCasesFactory {
    public createAbsoluteVitalsUseCase(): AbsoluteVitalsUseCase {
        return new AbsoluteVitalsUseCase();
    }
}
