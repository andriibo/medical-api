import {Inject, Injectable} from '@nestjs/common';
import {DiagnosisListUseCase} from 'app/modules/diagnosis/use-cases/diagnosis-list.use-case';
import {IDiagnosisRepository} from 'app/modules/diagnosis/repositories';

@Injectable()
export class DiagnosisUseCasesFactory {
    public constructor(@Inject(IDiagnosisRepository) private readonly diagnosisRepository: IDiagnosisRepository) {}

    public createDiagnosisListUseCase(): DiagnosisListUseCase {
        return new DiagnosisListUseCase(this.diagnosisRepository);
    }
}
