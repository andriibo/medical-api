import {Body, Controller, HttpCode, HttpStatus, Post, Req} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {
    ConfirmSignUpUserView,
    SignInUserView,
    SignUpDoctorView,
    SignUpPatientView,
    ForgotPasswordView,
    ConfirmForgotPasswordView,
    ChangeEmailView,
    ConfirmChangeEmailView,
} from 'presentation/views/request/auth';
import {ChangeEmailResponseView, ForgotPasswordResponseView, UserSignedInView} from 'presentation/views/response/auth';
import {AuthUseCasesFactory} from 'infrastructure/factories/auth-use-cases.factory';
import {UserRequest} from 'presentation/middlewares/assign-user.middleware';
import {Auth} from 'presentation/guards';
import {ChangeEmailDto} from 'domain/dtos/request/auth/change-email.dto';
import {ConfirmChangeEmailDto} from 'domain/dtos/request/auth/confirm-change-email.dto';

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
    @ApiResponse({status: HttpStatus.CREATED})
    public async signUpDoctor(@Body() requestBody: SignUpDoctorView): Promise<void> {
        const useCase = this.authUseCasesFactory.createSignUpUseCase();

        await useCase.signUpDoctor(requestBody);
    }

    @Post('sign-up/patient')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({status: HttpStatus.CREATED})
    public async signUpPatient(@Body() requestBody: SignUpPatientView): Promise<void> {
        const useCase = this.authUseCasesFactory.createSignUpUseCase();

        await useCase.signUpPatient(requestBody);
    }

    @Post('confirm-sign-up')
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
}
