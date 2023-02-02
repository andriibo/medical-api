import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {PatientCategoryBorderlineUseCase} from 'app/modules/patient-category/use-cases';
import {PatientCategoryNormalUseCase} from 'app/modules/patient-category/use-cases/patient-category-normal.use-case';
import {PatientCategorySpecification} from 'app/modules/patient-category/specifications/patient-category.specification';

@Injectable()
export class PatientCategoryUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientCategoryRepository) private readonly patientCategoryRepository: IPatientCategoryRepository,
        @Inject(PatientCategorySpecification)
        private readonly patientCategorySpecification: PatientCategorySpecification,
    ) {}

    public createPatientCategoryNormalUseCase(): PatientCategoryNormalUseCase {
        return new PatientCategoryNormalUseCase(
            this.authedUserService,
            this.patientCategoryRepository,
            this.patientCategorySpecification,
        );
    }

    public createPatientCategoryBorderlineUseCase(): PatientCategoryBorderlineUseCase {
        return new PatientCategoryBorderlineUseCase(
            this.authedUserService,
            this.patientCategoryRepository,
            this.patientCategorySpecification,
        );
    }
}
