import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {SignInUseCase} from 'app/use-cases/auth/sign-in.use-case';
import {SignUpUseCase} from 'app/use-cases/auth/sign-up.use-case';
import {ConfirmSignUpUserView, SignInUserView, SignUpUserView} from 'presentation/views/auth';

@Controller()
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly signInUseCase: SignInUseCase, private readonly signUpUseCase: SignUpUseCase) {}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: String})
    public async signIn(@Body() requestBody: SignInUserView): Promise<string> {
        const result = await this.signInUseCase.signInUser(requestBody);
        return result;
    }

    @Post('sign-up')
    @HttpCode(HttpStatus.OK)
    public async signUp(@Body() requestBody: SignUpUserView): Promise<void> {
        await this.signUpUseCase.signUpUser(requestBody);
    }

    @Post('confirm-sign-up')
    @HttpCode(HttpStatus.OK)
    public async confirmSignUp(@Body() requestBody: ConfirmSignUpUserView): Promise<void> {
        await this.signUpUseCase.confirmSignUnUser(requestBody);
    }
}
