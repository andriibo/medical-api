import {Inject, Injectable} from '@nestjs/common';
import {IAuthService} from 'app/services/auth.service';
import {IUserEntityMapper} from 'app/mappers/user-entity.mapper';
import {IUserRepository} from 'app/repositories/user.repository';
import {InitiateDataAccessUseCase} from 'app/use-cases/patient';

@Injectable()
export class PatientUseCasesFactory {
    constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IUserEntityMapper) private readonly userEntityMapper: IUserEntityMapper,
    ) {}

    public createInitiateDataAccessUseCase(): InitiateDataAccessUseCase {
        return new InitiateDataAccessUseCase(this.authService, this.userRepository, this.userEntityMapper);
    }
}
