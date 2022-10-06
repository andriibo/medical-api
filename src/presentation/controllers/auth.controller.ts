import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ConfirmSignUpUserView, SignInUserView, SignUpDoctorView, SignUpPatientView} from 'presentation/views/auth';
import {AuthUseCasesFactory} from 'infrastructure/factories/auth-use-cases.factory';

@Controller()
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authUseCasesFactory: AuthUseCasesFactory) {}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async signIn(@Body() requestBody: SignInUserView): Promise<string> {
        const useCase = this.authUseCasesFactory.createSignInUseCase();

        return await useCase.signInUser(requestBody);
    }

    @Post('sign-up/doctor')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async signUpDoctor(@Body() requestBody: SignUpDoctorView): Promise<object> {
        const useCase = this.authUseCasesFactory.createSignUpUseCase();

        return await useCase.signUpDoctor(requestBody);
    }

    @Post('sign-up/patient')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async signUpPatient(@Body() requestBody: SignUpPatientView): Promise<object> {
        const useCase = this.authUseCasesFactory.createSignUpUseCase();

        return await useCase.signUpPatient(requestBody);
    }

    @Post('confirm-sign-up')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async confirmSignUp(@Body() requestBody: ConfirmSignUpUserView): Promise<void> {
        const useCase = this.authUseCasesFactory.createConfirmSignUpUseCase();

        await useCase.confirmSignUpUser(requestBody);
    }
}
