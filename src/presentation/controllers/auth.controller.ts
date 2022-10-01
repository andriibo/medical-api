import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {ConfirmSignUpUserUseCase, SignUpUseCase, SignInUseCase} from 'app/use-cases/auth';
import {ConfirmSignUpUserView, SignInUserView, SignUpDoctorView, SignUpPatientView} from 'presentation/views/auth';

@Controller()
@ApiTags('Auth')
export class AuthController {
    constructor(
        private readonly signInUseCase: SignInUseCase,
        private readonly signUpUseCase: SignUpUseCase,
        private readonly confirmSignUpUserUseCase: ConfirmSignUpUserUseCase,
    ) {}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: String})
    public async signIn(@Body() requestBody: SignInUserView): Promise<string> {
        const result = await this.signInUseCase.signInUser(requestBody);
        return result;
    }

    @Post('sign-up/doctor')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async signUpDoctor(@Body() requestBody: SignUpDoctorView): Promise<object> {
        return this.signUpUseCase.signUpDoctor(requestBody);
    }

    @Post('sign-up/patient')
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async signUpPatient(@Body() requestBody: SignUpPatientView): Promise<object> {
        return this.signUpUseCase.signUpPatient(requestBody);
    }

    @Post('confirm-sign-up')
    @HttpCode(HttpStatus.OK)
    public async confirmSignUp(@Body() requestBody: ConfirmSignUpUserView): Promise<void> {
        await this.confirmSignUpUserUseCase.confirmSignUpUser(requestBody);
    }
}
