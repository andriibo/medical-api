import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories/suggested-contact.repository';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';
import {ISuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/suggested-contact-entity.mapper';
import {
    CreateSuggestedContactUseCase,
    DeleteSuggestedContactUseCase,
    PatientContactListUseCase,
} from 'app/modules/suggested-contact/use-cases/granted-user';
import {DeleteSuggestedContactByGrantedUserService} from 'app/modules/suggested-contact/services/delete-suggested-contact-by-granted-user.service';
import {SuggestedContactDtoMapper} from 'app/modules/suggested-contact/mappers/suggested-contact-dto.mapper';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(ISuggestedContactRepository)
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        @Inject(ISuggestedContactEntityMapper)
        private readonly suggestedContactEntityMapper: ISuggestedContactEntityMapper,
        @Inject(SuggestedContactDtoMapper) private readonly suggestedContactDtoMapper: SuggestedContactDtoMapper,
        @Inject(SuggestedContactSpecification)
        private readonly suggestedContactSpecification: SuggestedContactSpecification,
        @Inject(DeleteSuggestedContactByGrantedUserService)
        private readonly deleteSuggestedContactByGrantedUserService: DeleteSuggestedContactByGrantedUserService,
    ) {}

    public createSuggestedContactUseCase(): CreateSuggestedContactUseCase {
        return new CreateSuggestedContactUseCase(
            this.authedUserService,
            this.suggestedContactRepository,
            this.suggestedContactEntityMapper,
            this.suggestedContactSpecification,
        );
    }

    public createDeleteSuggestedContactUseCase(): DeleteSuggestedContactUseCase {
        return new DeleteSuggestedContactUseCase(
            this.authedUserService,
            this.suggestedContactRepository,
            this.deleteSuggestedContactByGrantedUserService,
        );
    }

    public createPatientContactUseCase(): PatientContactListUseCase {
        return new PatientContactListUseCase(
            this.authedUserService,
            this.suggestedContactRepository,
            this.suggestedContactDtoMapper,
        );
    }
}
