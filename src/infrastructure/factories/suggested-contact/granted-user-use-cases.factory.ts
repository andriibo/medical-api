import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories/suggested-contact.repository';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';
import {ISuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/suggested-contact-entity.mapper';
import {
    CreateSuggestedContactUseCase,
    DeleteSuggestedContactUseCase,
} from 'app/modules/suggested-contact/use-cases/granted-user';
import {DeleteSuggestedContactByGrantedUserService} from 'app/modules/suggested-contact/services/delete-suggested-contact-by-granted-user.service';
import {ContactListUseCase} from 'app/modules/suggested-contact/use-cases/granted-user/contact-list.use-case';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(ISuggestedContactRepository)
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        @Inject(ISuggestedContactEntityMapper)
        private readonly suggestedContactEntityMapper: ISuggestedContactEntityMapper,
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

    public createContactListUseCase(): ContactListUseCase {
        return new ContactListUseCase(this.authedUserService, this.suggestedContactRepository);
    }
}
