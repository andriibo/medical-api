import {Controller, Get} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {HelloUseCase} from 'app/use-cases/hello.use-case';
import {Roles} from 'presentation/guards';

@Controller()
@ApiBearerAuth()
@ApiTags('App')
export class AppController {
    constructor(private readonly helloUseCase: HelloUseCase) {}

    @Get()
    @Roles('Patient')
    public getHello(): string {
        return this.helloUseCase.getHello();
    }
}
