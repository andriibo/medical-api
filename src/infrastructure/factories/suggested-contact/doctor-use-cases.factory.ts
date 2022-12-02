import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories/suggested-contact.repository';
import {DeleteSuggestedContactUseCase} from 'app/modules/suggested-contact/use-cases/doctor/delete-suggested-contact.use-case';
import {DeleteSuggestedContactByDoctorService} from 'app/modules/suggested-contact/services/delete-suggested-contact-by-doctor.service';

@Injectable()
export class DoctorUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(ISuggestedContactRepository)
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        @Inject(DeleteSuggestedContactByDoctorService)
        private readonly deleteSuggestedContactByDoctorService: DeleteSuggestedContactByDoctorService,
    ) {}

    public createDeleteSuggestedContactUseCase(): DeleteSuggestedContactUseCase {
        return new DeleteSuggestedContactUseCase(
            this.authedUserService,
            this.suggestedContactRepository,
            this.deleteSuggestedContactByDoctorService,
        );
    }
}
