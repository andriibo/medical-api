import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {CognitoService} from './infrastructure/aws/cognito.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly cognitoService: CognitoService
    ) {
    }

    @Get()
    async getHello(): Promise<string> {
        await this.cognitoService.signIn();
        return this.appService.getHello();
    }
}
