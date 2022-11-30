import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {CaregiverProfileUseCase} from 'app/modules/profile/use-cases/caregiver';

@Injectable()
export class CaregiverUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
    ) {}

    public createGetCaregiverProfileUseCase(): CaregiverProfileUseCase {
        return new CaregiverProfileUseCase(this.authedUserService, this.fileUrlService);
    }
}
