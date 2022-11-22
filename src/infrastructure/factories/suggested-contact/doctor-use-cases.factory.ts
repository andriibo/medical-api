import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories/suggested-contact.repository';
import {CreateSuggestedContactUseCase} from 'app/modules/suggested-contact/use-cases/doctor';
import {ISuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/suggested-contact-entity.mapper';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

@Injectable()
export class DoctorUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(ISuggestedContactRepository)
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        @Inject(ISuggestedContactEntityMapper)
        private readonly suggestedContactEntityMapper: ISuggestedContactEntityMapper,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public createSuggestedContactUseCase(): CreateSuggestedContactUseCase {
        return new CreateSuggestedContactUseCase(
            this.authedUserService,
            this.suggestedContactRepository,
            this.suggestedContactEntityMapper,
            this.patientDataAccessSpecification,
        );
    }
}
