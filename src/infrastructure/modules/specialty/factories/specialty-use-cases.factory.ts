import {Inject, Injectable} from '@nestjs/common';
import {GetSpecialtiesUseCase} from 'app/modules/specialty/use-cases/get-specialties.use-case';
import {ISpecialtyRepository} from 'app/modules/specialty/repositories';

@Injectable()
export class SpecialtyUseCasesFactory {
    public constructor(@Inject(ISpecialtyRepository) private readonly specialtyRepository: ISpecialtyRepository) {}

    public createGetSpecialtiesUseCase(): GetSpecialtiesUseCase {
        return new GetSpecialtiesUseCase(this.specialtyRepository);
    }
}
