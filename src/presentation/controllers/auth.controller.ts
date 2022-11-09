import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {
    ConfirmSignUpUserView,
    SignInUserView,
    SignUpDoctorView,
    SignUpPatientView,
    ForgotPasswordView,
    ConfirmForgotPasswordView,
} from 'presentation/views/request/auth';
import {ForgotPasswordResponseView, UserSignedInView} from 'presentation/views/response/auth';
import {AuthUseCasesFactory} from 'infrastructure/factories/auth-use-cases.factory';
import {UserSignedInDto} from 'domain/dtos/response/auth/user-signed-in.dto';

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
}
