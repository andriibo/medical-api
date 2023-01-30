import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {PatientCategoryBorderlineUseCase, PatientCategoryUseCase} from 'app/modules/patient-category/use-cases';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientCategoryNormalUseCase} from 'app/modules/patient-category/use-cases/patient-category-normal.use-case';
import {PatientCategorySpecification} from 'app/modules/patient-category/specifications/patient-category.specification';

@Injectable()
export class PatientCategoryUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(IPatientCategoryRepository) private readonly patientCategoryRepository: IPatientCategoryRepository,
        @Inject(PatientCategorySpecification)
        private readonly patientCategorySpecification: PatientCategorySpecification,
    ) {}

    public createPatientCategoryUseCase(): PatientCategoryUseCase {
        return new PatientCategoryUseCase(
            this.authedUserService,
            this.patientDataAccessSpecification,
            this.patientCategoryRepository,
        );
    }

    public createPatientCategoryNormalUseCase(): PatientCategoryNormalUseCase {
        return new PatientCategoryNormalUseCase(
            this.authedUserService,
            this.patientDataAccessSpecification,
            this.patientCategoryRepository,
            this.patientCategorySpecification,
        );
    }

    public createPatientCategoryBorderlineUseCase(): PatientCategoryBorderlineUseCase {
        return new PatientCategoryBorderlineUseCase(
            this.authedUserService,
            this.patientDataAccessSpecification,
            this.patientCategoryRepository,
            this.patientCategorySpecification,
        );
    }
}
