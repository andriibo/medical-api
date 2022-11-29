import {Body, Controller, HttpCode, HttpStatus, Post, Req} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags, ApiOperation} from '@nestjs/swagger';
import {
    ConfirmSignUpUserView,
    SignInUserView,
    SignUpDoctorView,
    SignUpPatientView,
    ForgotPasswordView,
    ConfirmForgotPasswordView,
    ChangeEmailView,
    ConfirmChangeEmailView,
    ChangePasswordView,
    ResendSignUpCodeView,
} from 'presentation/views/request/auth';
import {
    ChangeEmailResponseView,
    ForgotPasswordResponseView,
    ResendSignUpCodeResponseView,
    UserSignedInView,
} from 'presentation/views/response/auth';
import {AuthUseCasesFactory} from 'infrastructure/factories/auth-use-cases.factory';
import {UserRequest} from 'presentation/middlewares/assign-user.middleware';
import {Auth} from 'presentation/guards';
import {ChangeEmailDto} from 'domain/dtos/request/auth/change-email.dto';
import {ConfirmChangeEmailDto} from 'domain/dtos/request/auth/confirm-change-email.dto';
import {ChangePasswordDto} from 'domain/dtos/request/auth/change-password.dto';
import {SignUpCaregiverView} from 'views/request/auth/sign-up-caregiver.view';

@Controller()
@ApiTags('Auth')
export class AuthController {
    public constructor(private readonly authUseCasesFactory: AuthUseCasesFactory) {}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: UserSignedInView})
    public async signIn(@Body() requestBody: SignInUserView): Promise<UserSignedInView> {
        const useCase = this.authUseCasesFactory.createSignInUseCase();

        return await useCase.signInUser(requestBody);
    }

    @Post('sign-up/doctor')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({deprecated: true, summary: 'Deprecated endpoint. Use POST "/doctor/sign-up" instead.'})
    @ApiResponse({status: HttpStatus.CREATED})
    public async signUpDoctorDeprecated(@Body() requestBody: SignUpDoctorView): Promise<void> {
        await this.signUpDoctor(requestBody);
    }

    @Post('sign-up/patient')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({deprecated: true, summary: 'Deprecated endpoint. Use POST "/patient/sign-up" instead.'})
    @ApiResponse({status: HttpStatus.CREATED})
    public async signUpPatientDeprecated(@Body() requestBody: SignUpPatientView): Promise<void> {
        await this.signUpPatient(requestBody);
    }

    @Post('doctor/sign-up')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({status: HttpStatus.CREATED})
    public async signUpDoctor(@Body() requestBody: SignUpDoctorView): Promise<void> {
        const useCase = this.authUseCasesFactory.createSignUpUseCase();

        await useCase.signUpDoctor(requestBody);
    }

    @Post('patient/sign-up')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({status: HttpStatus.CREATED})
    public async signUpPatient(@Body() requestBody: SignUpPatientView): Promise<void> {
        const useCase = this.authUseCasesFactory.createSignUpUseCase();

        await useCase.signUpPatient(requestBody);
    }

    @Post('caregiver/sign-up')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({status: HttpStatus.CREATED})
    public async signUpCaregiver(@Body() requestBody: SignUpCaregiverView): Promise<void> {
        const useCase = this.authUseCasesFactory.createSignUpUseCase();

        await useCase.signUpCaregiver(requestBody);
    }

    @Post('confirm-sign-up')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({deprecated: true, summary: 'Deprecated endpoint. Use POST "/sign-up/confirm" instead.'})
    @ApiResponse({status: HttpStatus.OK})
    public async confirmSignUpDeprecated(@Body() requestBody: ConfirmSignUpUserView): Promise<void> {
        await this.confirmSignUp(requestBody);
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
    public async forgotPassword(@Body() requestBody: ForgotPasswordView): Promise<ForgotPasswordResponseView> {
        const useCase = this.authUseCasesFactory.createForgotPasswordUseCase();

        return await useCase.initiateForgotPasswordProcess(requestBody);
    }

    @Post('forgot-password/confirm')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async confirmForgotPassword(@Body() requestBody: ConfirmForgotPasswordView): Promise<void> {
        const useCase = this.authUseCasesFactory.createForgotPasswordUseCase();

        await useCase.confirmForgotPassword(requestBody);
    }

    @Auth()
    @ApiBearerAuth()
    @Post('change-email')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async changeEmail(
        @Req() request: UserRequest,
        @Body() requestBody: ChangeEmailView,
    ): Promise<ChangeEmailResponseView> {
        const useCase = this.authUseCasesFactory.createChangeEmailUseCase();

        return await useCase.changeEmail(new ChangeEmailDto(requestBody.email, request.user.token));
    }

    @Auth()
    @ApiBearerAuth()
    @Post('change-email/confirm')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async confirmChangeEmail(
        @Req() request: UserRequest,
        @Body() requestBody: ConfirmChangeEmailView,
    ): Promise<void> {
        const useCase = this.authUseCasesFactory.createChangeEmailUseCase();

        await useCase.confirmChangeEmail(new ConfirmChangeEmailDto(requestBody.code, request.user.token));
    }

    @Auth()
    @ApiBearerAuth()
    @Post('change-password')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async changePassword(@Req() request: UserRequest, @Body() requestBody: ChangePasswordView): Promise<void> {
        const useCase = this.authUseCasesFactory.createChangePasswordUseCase();

        return await useCase.changePassword(
            new ChangePasswordDto(requestBody.currentPassword, requestBody.newPassword, request.user.token),
        );
    }

    @Post('sign-up/resend-code')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: ResendSignUpCodeResponseView})
    public async resendSignUpCode(@Body() requestBody: ResendSignUpCodeView): Promise<ResendSignUpCodeResponseView> {
        const useCase = this.authUseCasesFactory.createResendSignUpCodeUseCase();

        return await useCase.resendCode(requestBody);
    }
}
