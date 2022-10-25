import {Inject, Injectable} from '@nestjs/common';
import {MedicationListUseCase} from 'app/modules/medication/use-cases/medication-list.use-case';
import {IMedicationRepository} from 'app/modules/medication/repositories';

@Injectable()
export class MedicationUseCasesFactory {
    public constructor(@Inject(IMedicationRepository) private readonly medicationRepository: IMedicationRepository) {}

    public createMedicationListUseCase(): MedicationListUseCase {
        return new MedicationListUseCase(this.medicationRepository);
    }
}
