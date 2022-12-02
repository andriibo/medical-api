import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories/suggested-contact.repository';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';
import {ISuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/suggested-contact-entity.mapper';
import {CreateSuggestedContactUseCase} from 'app/modules/suggested-contact/use-cases/grant-user';

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
    ) {}

    public createSuggestedContactUseCase(): CreateSuggestedContactUseCase {
        return new CreateSuggestedContactUseCase(
            this.authedUserService,
            this.suggestedContactRepository,
            this.suggestedContactEntityMapper,
            this.suggestedContactSpecification,
        );
    }
}
