import {Controller, Get} from '@nestjs/common';
import {HelloUseCase} from 'app/use-cases/hello.use-case';
import {CognitoService} from 'infrastructure/aws/cognito.service';

@Controller()
export class AppController {
    constructor(
        private readonly helloUseCase: HelloUseCase,
        private readonly cognitoService: CognitoService
    ) {
    }

    @Get()
    getHello(): string {
        return this.helloUseCase.getHello();
    }

    @Get('cognito')
    async getCognito(): Promise<string> {
        await this.cognitoService.signIn();
        return this.helloUseCase.getHello();
    }
}
