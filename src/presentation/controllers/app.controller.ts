import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HelloUseCase } from 'app/use-cases/hello.use-case';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly helloUseCase: HelloUseCase) {}

  @Get()
  public getHello(): string {
    return this.helloUseCase.getHello();
  }
}
