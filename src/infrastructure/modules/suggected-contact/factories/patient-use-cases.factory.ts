import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories/suggested-contact.repository';
import {DeleteSuggestedContactUseCase} from 'app/modules/suggested-contact/use-cases/patient';
import {DeleteSuggestedContactByPatientService} from 'app/modules/suggested-contact/services/delete-suggested-contact-by-patient.service';
import {ApproveSuggestedContactUseCase} from 'app/modules/suggested-contact/use-cases/patient/approve-suggested-contact.use-case';
import {ApproveSuggestedContactByPatientService} from 'app/modules/suggested-contact/services/approve-suggested-contact-by-patient.service';
import {ContactListUseCase} from 'app/modules/suggested-contact/use-cases/patient/contact-list.use-case';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(ISuggestedContactRepository)
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        @Inject(DeleteSuggestedContactByPatientService)
        private readonly deleteSuggestedContactByPatientService: DeleteSuggestedContactByPatientService,
        @Inject(ApproveSuggestedContactByPatientService)
        private readonly approveSuggestedContactByPatientService: ApproveSuggestedContactByPatientService,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(UserDtoService) private readonly userDtoService: UserDtoService,
    ) {}

    public createDeleteSuggestedContactUseCase(): DeleteSuggestedContactUseCase {
        return new DeleteSuggestedContactUseCase(
            this.authedUserService,
            this.suggestedContactRepository,
            this.deleteSuggestedContactByPatientService,
        );
    }

    public createApproveSuggestedContactUseCase(): ApproveSuggestedContactUseCase {
        return new ApproveSuggestedContactUseCase(
            this.authedUserService,
            this.suggestedContactRepository,
            this.approveSuggestedContactByPatientService,
        );
    }

    public createContactListUseCase(): ContactListUseCase {
        return new ContactListUseCase(
            this.authedUserService,
            this.suggestedContactRepository,
            this.userRepository,
            this.userDtoService,
        );
    }
}
