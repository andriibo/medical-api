import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {
    ConfirmSignUpUserView,
    SignInUserView,
    SignUpDoctorView,
    SignUpPatientView,
    ForgotPasswordView,
    ConfirmForgotPasswordView,
    ResendSignUpCodeView,
} from 'presentation/views/request/auth';
import {
    ForgotPasswordResponseView,
    ResendSignUpCodeResponseView,
    UserSignedInView,
} from 'presentation/views/response/auth';
import {AuthUseCasesFactory} from 'infrastructure/modules/auth/factories/auth-use-cases.factory';
import {SignUpCaregiverView} from 'views/request/auth/sign-up-caregiver.view';
import {ConfirmEmailResentDto, ForgotPasswordMailSentDto, UserSignedInDto} from 'domain/dtos/response/auth';
import {ParseDateISO8601Pipe} from 'presentation/pipes/parse-date-iso-8601.pipe';

@Controller()
@ApiTags('Auth')
export class AuthController {
    public constructor(private readonly authUseCasesFactory: AuthUseCasesFactory) {}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: UserSignedInView})
    public async signIn(@Body() requestBody: SignInUserView): Promise<UserSignedInDto> {
        const useCase = this.authUseCasesFactory.createSignInUseCase();

        return await useCase.signInUser(requestBody);
    }

    @Post('doctor/sign-up')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({status: HttpStatus.CREATED})
    public async signUpDoctor(@Body() requestBody: SignUpDoctorView): Promise<void> {
        const useCase = this.authUseCasesFactory.createDoctorSignUpUseCase();

        await useCase.signUp(requestBody);
    }

    @Post('patient/sign-up')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({status: HttpStatus.CREATED})
    public async signUpPatient(@Body(ParseDateISO8601Pipe) requestBody: SignUpPatientView): Promise<void> {
        const useCase = this.authUseCasesFactory.createPatientSignUpUseCase();

        await useCase.signUp(requestBody);
    }

    @Post('caregiver/sign-up')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({status: HttpStatus.CREATED})
    public async signUpCaregiver(@Body() requestBody: SignUpCaregiverView): Promise<void> {
        const useCase = this.authUseCasesFactory.createCaregiverSignUpUseCase();

        await useCase.signUp(requestBody);
    }

    @Post('sign-up/confirm')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async confirmSignUp(@Body() requestBody: ConfirmSignUpUserView): Promise<void> {
        const useCase = this.authUseCasesFactory.createConfirmSignUpUseCase();

        await useCase.confirmSignUpUser(requestBody);
    }

    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: ForgotPasswordResponseView})
    public async forgotPassword(@Body() requestBody: ForgotPasswordView): Promise<ForgotPasswordMailSentDto> {
        const useCase = this.authUseCasesFactory.createForgotPasswordUseCase();

        return await useCase.initiateForgotPasswordProcess(requestBody);
    }

    @Post('forgot-password/confirm')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async confirmForgotPassword(@Body() requestBody: ConfirmForgotPasswordView): Promise<void> {
        const useCase = this.authUseCasesFactory.createConfirmForgotPasswordUseCase();

        await useCase.confirm(requestBody);
    }

    @Post('sign-up/resend-code')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: ResendSignUpCodeResponseView})
    public async resendSignUpCode(@Body() requestBody: ResendSignUpCodeView): Promise<ConfirmEmailResentDto> {
        const useCase = this.authUseCasesFactory.createResendSignUpCodeUseCase();

        return await useCase.resendCode(requestBody);
    }
}
