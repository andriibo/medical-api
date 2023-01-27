import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {PatientCategoryUseCase} from 'app/modules/patient-category/use-cases';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

@Injectable()
export class PatientCategoryUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(IPatientCategoryRepository) private readonly patientCategoryRepository: IPatientCategoryRepository,
    ) {}

    public createPatientCategoryUseCase(): PatientCategoryUseCase {
        return new PatientCategoryUseCase(
            this.authedUserService,
            this.patientDataAccessSpecification,
            this.patientCategoryRepository,
        );
    }
}
