import {Inject, Injectable} from '@nestjs/common';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {IUserEntityMapper} from 'app/modules/auth/mappers/user-entity.mapper';
import {IUserRepository} from 'app/modules/auth/repositories';
import {
    ConfirmSignUpUserUseCase,
    ForgotPasswordUseCase,
    SignInUseCase,
    ResendSignUpCodeUseCase,
    PatientSignUpUseCase,
    ConfirmForgotPasswordUseCase,
} from 'app/modules/auth/use-cases';
import {IAuthEventEmitter} from 'app/modules/auth/event-emitters/auth.event-emitter';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {DoctorSignUpUseCase} from 'app/modules/auth/use-cases/doctor-sign-up.use-case';
import {CaregiverSignUpUseCase} from 'app/modules/auth/use-cases/caregiver-sign-up.use-case';

@Injectable()
export class AuthUseCasesFactory {
    public constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IUserEntityMapper) private readonly userEntityMapper: IUserEntityMapper,
        @Inject(IAuthEventEmitter) private readonly authEventEmitter: IAuthEventEmitter,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientVitalThresholdsEntityMapper)
        private readonly patientVitalThresholdsEntityMapper: IPatientVitalThresholdsEntityMapper,
    ) {}

    public createPatientSignUpUseCase(): PatientSignUpUseCase {
        return new PatientSignUpUseCase(
            this.authService,
            this.userRepository,
            this.userEntityMapper,
            this.patientVitalThresholdsEntityMapper,
            this.authEventEmitter,
        );
    }

    public createDoctorSignUpUseCase(): DoctorSignUpUseCase {
        return new DoctorSignUpUseCase(
            this.authService,
            this.userRepository,
            this.userEntityMapper,
            this.authEventEmitter,
        );
    }

    public createCaregiverSignUpUseCase(): CaregiverSignUpUseCase {
        return new CaregiverSignUpUseCase(
            this.authService,
            this.userRepository,
            this.userEntityMapper,
            this.authEventEmitter,
        );
    }

    public createSignInUseCase(): SignInUseCase {
        return new SignInUseCase(this.authService, this.authedUserService);
    }

    public createConfirmSignUpUseCase(): ConfirmSignUpUserUseCase {
        return new ConfirmSignUpUserUseCase(this.authService, this.authEventEmitter);
    }

    public createResendSignUpCodeUseCase(): ResendSignUpCodeUseCase {
        return new ResendSignUpCodeUseCase(this.authService);
    }

    public createForgotPasswordUseCase(): ForgotPasswordUseCase {
        return new ForgotPasswordUseCase(this.authService);
    }

    public createConfirmForgotPasswordUseCase(): ConfirmForgotPasswordUseCase {
        return new ConfirmForgotPasswordUseCase(this.authService);
    }
}
