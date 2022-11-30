import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {CaregiverProfileUseCase} from 'app/modules/profile/use-cases/caregiver';

@Injectable()
export class CaregiverUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
    ) {}

    public createGetCaregiverProfileUseCase(): CaregiverProfileUseCase {
        return new CaregiverProfileUseCase(this.authedUserService, this.fileUrlService);
    }
}
