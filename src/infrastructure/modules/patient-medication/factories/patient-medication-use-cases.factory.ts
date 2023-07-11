import {Inject, Injectable} from '@nestjs/common';
import {
    CreateMedicationUseCase,
    DeleteMedicationUseCase,
    MedicationListUseCase,
    UpdateMedicationUseCase,
} from 'app/modules/patient-medication/use-cases';
import {IPatientMedicationRepository} from 'app/modules/patient-medication/repositories';
import {IPatientMedicationEntityMapper} from 'app/modules/patient-medication/mappers/patient-medication-entity.mapper';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientMedicationSpecification} from 'app/modules/patient-medication/specifications/patient-medication.specification';

@Injectable()
export class PatientMedicationUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientMedicationRepository)
        private readonly patientMedicationRepository: IPatientMedicationRepository,
        @Inject(IPatientMedicationEntityMapper)
        private readonly patientMedicationEntityMapper: IPatientMedicationEntityMapper,
        @Inject(PatientMedicationSpecification)
        private readonly patientMedicationSpecification: PatientMedicationSpecification,
    ) {}

    public createCreateMedicationUseCase(): CreateMedicationUseCase {
        return new CreateMedicationUseCase(
            this.authedUserService,
            this.patientMedicationRepository,
            this.patientMedicationEntityMapper,
            this.patientMedicationSpecification,
        );
    }

    public createUpdateMedicationUseCase(): UpdateMedicationUseCase {
        return new UpdateMedicationUseCase(
            this.authedUserService,
            this.patientMedicationRepository,
            this.patientMedicationEntityMapper,
            this.patientMedicationSpecification,
        );
    }

    public createMedicationListUseCase(): MedicationListUseCase {
        return new MedicationListUseCase(
            this.authedUserService,
            this.patientMedicationRepository,
            this.patientMedicationSpecification,
        );
    }

    public createDeleteMedicationUseCase(): DeleteMedicationUseCase {
        return new DeleteMedicationUseCase(
            this.authedUserService,
            this.patientMedicationRepository,
            this.patientMedicationSpecification,
        );
    }
}
