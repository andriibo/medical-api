import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories/suggested-contact.repository';
import {RefuseSuggestedContactUseCase} from 'app/modules/suggested-contact/use-cases/patient';
import {DeleteSuggestedContactByPatientService} from 'app/modules/suggested-contact/services/delete-suggested-contact-by-patient.service';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(ISuggestedContactRepository)
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        @Inject(DeleteSuggestedContactByPatientService)
        private readonly deleteSuggestedContactByPatientService: DeleteSuggestedContactByPatientService,
    ) {}

    public createRefuseSuggestedContactUseCase(): RefuseSuggestedContactUseCase {
        return new RefuseSuggestedContactUseCase(
            this.authedUserService,
            this.suggestedContactRepository,
            this.deleteSuggestedContactByPatientService,
        );
    }
}
