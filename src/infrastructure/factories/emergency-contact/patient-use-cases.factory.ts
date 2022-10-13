import {Inject, Injectable} from '@nestjs/common';
import {CreateContactUseCase} from 'app/use-cases/emergency-contact/patient';
import {IAuthedUserService} from 'app/services/authed-user.service';

@Injectable()
export class PatientUseCasesFactory {
    constructor(@Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService) {}

    public createCreateContactUseCase(): CreateContactUseCase {
        return new CreateContactUseCase(this.authedUserService);
    }
}
